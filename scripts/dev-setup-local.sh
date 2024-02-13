#!/bin/bash


echo '>>>>>>>>>>  DOCKER'
docker-compose down
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

# envContent=$(cat apps/cocm-registry/.env)
# envContent=${envContent//\$user_pool_id/$UserPoolId}
# envContent=${envContent//\$user_pool_client_id/$UserPoolClient}
# echo "$envContent" > apps/cocm-registry/.env

rcFile=$([ "$SHELL" = "/bin/zsh" ] && echo "~/.zshrc" || echo "~/.bashrc")

CYAN='\033[0;36m'
printf "
✅ Setup Complete
📝 Add this in your $rcFile
${CYAN}export AKELLO_API_URL=http://127.0.0.1:8000/v1
${CYAN}export AKELLO_COGNITO_URL=http://localhost:9229
${CYAN}export AKELLO_DYNAMODB_LOCAL_URL=http://localhost:8001
${CYAN}export AWS_ACCESS_KEY_ID=''
${CYAN}export AWS_ACCOUNT_ID=''
${CYAN}export AWS_BUCKET=''
${CYAN}export AWS_CLOUD_FRONT_DISTRIBUTION=''
${CYAN}export AWS_COGNITO_APP_CLIENT_ID=$UserPoolClient
${CYAN}export AWS_COGNITO_USERPOOL_ID=$UserPoolId
${CYAN}export AWS_DYNAMODB_TABLE='akello-local'
${CYAN}export AWS_REGION=''
${CYAN}export AWS_SECRET_ACCESS_KEY=''
${CYAN}export AWS_SECRET_NAME=''
"