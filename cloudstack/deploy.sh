#!/bin/bash

cdk deploy AwsStack --profile $1 --outputs-file aws-stack-deploy-output.json 

# Set environment vairables using outputs from the previous command

export AKELLO_API_URL=$(jq -r '.AwsStack.AWSAPIGATEWAY' aws-stack-deploy-output.json)v1
export AWS_COGNITO_USERPOOL_ID=$(jq -r '.AwsStack.AWSCOGNITOUSERPOOLID' aws-stack-deploy-output.json)
export AWS_COGNITO_APP_CLIENT_ID=$(jq -r '.AwsStack.AWSCOGNITOAPPCLIENTID' aws-stack-deploy-output.json)

# Build static files
sh ../scripts/dev-build-cloudstack-deploy.sh

# Deploy the app
cdk deploy DeployStack --profile $1