#!/bin/bash

echo '>>>>>>>>>>  COMMON'
cd packages/common
rm -rf node_modules
npm install
cd ../../

echo '>>>>>>>>>>  CORE'
cd packages/core
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  REACT'
cd packages/react
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../


echo '>>>>>>>>>>  INSIGHTS'
cd packages/react-insights
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  MEDICAL'
cd packages/react-medical
rm -rf node_modules
rm -rf dist
npm install
npm run build
rm -rf node_modules
cd ../../

echo '>>>>>>>>>>  APPS'
cd apps/akello-app
rm -rf node_modules
npm install

echo '>>>>>>>>>>  DOCKER'
docker-compose up -d 

if ! command -v aws &> /dev/null
then
echo '>>>>>>>>>>  AWS CLI INSTALLATION'
case "$(uname -s)" in
  Darwin*) 
    echo 'Installing AWS CLI for MacOS...'
    brew install awscli
    ;;
  Linux*) 
    echo 'Installing AWS CLI for Linux...'
    ARCH=$(uname -m)
    case "$ARCH" in
      "x86_64") 
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        ;;
      "aarch64"|"arm64") 
        curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
        ;;
      *) 
        echo "Unsupported architecture: $ARCH"
        exit 1
        ;;
    esac
    unzip awscliv2.zip
    sudo ./aws/install
    ;;
  *) 
    echo 'Unsupported OS: unknown'
    exit 1
    ;;
esac
YELLOW='\e[33m'
BOLD=$(tput bold)
printf "
${YELLOW}${BOLD}Configure AWS CLI as follow:${BOLD}
${YELLOW}AWS Access Key ID [None]: RANDOM_VALUE
${YELLOW}AWS Secret Access Key [None]: RANDOM_VALUE
${YELLOW}Default region name [None]: us-west-2
${YELLOW}Default output format [None]: json
${YELLOW}"
printf "\e[0m"
aws configure
fi

echo '>>>>>>>>>>  SETTING UP AWS COGNITO'

stdout=$(aws --endpoint http://localhost:9229 cognito-idp create-user-pool --pool-name akello --no-cli-pager --output json)
UserPoolId=$(echo $stdout | jq -r '.UserPool.Id')

stdout=$(aws --endpoint http://localhost:9229 cognito-idp create-user-pool-client --user-pool-id $UserPoolId --client-name client --output json --no-cli-pager)
UserPoolClient=$(echo $stdout | jq -r '.UserPoolClient.ClientId')

cp apps/cocm-registry/.template.env apps/cocm-registry/.env

envContent=$(cat apps/cocm-registry/.env)
envContent=${envContent//\$user_pool_id/$UserPoolId}
envContent=${envContent//\$user_pool_client_id/$UserPoolClient}
echo "$envContent" > apps/cocm-registry/.env

rcFile=$([ "$SHELL" = "/bin/zsh" ] && echo "~/.zshrc" || echo "~/.bashrc")

CYAN='\033[0;36m'
printf "
✅ Setup Complete
📝 Add this in your $rcFile
${CYAN}export AKELLO_ENV=LOCAL
${CYAN}export AWS_REGION=us-west-2
${CYAN}export AWS_SECRET_NAME=''
${CYAN}export AWS_SECRET_SERVICE=''
${CYAN}export AWS_ACCESS_KEY_ID=''
${CYAN}export AWS_SECRET_ACCESS_KEY=''
${CYAN}export DYNAMODB_TABLE=akello
${CYAN}export AWS_COGNITO_USERPOOL_ID=$UserPoolId
${CYAN}export AWS_COGNITO_APP_CLIENT_ID=$UserPoolClient
"
