#!/bin/bash

cdk deploy AwsStack --profile Dev --outputs-file test.json 

# Set environment vairables using outputs from the previous command

export AKELLO_API_URL=$(jq -r '.AwsStack.apigatewayakelloakelloapiEndpointCFD72100' test.json)v1
export AWS_COGNITO_USERPOOL_ID=$(jq -r '.AwsStack.AWSCOGNITOUSERPOOLID' test.json)
export AWS_COGNITO_APP_CLIENT_ID=$(jq -r '.AwsStack.AWSCOGNITOAPPCLIENTID' test.json)

# Build static files
sh ../scripts/dev-build-cloudstack-deploy.sh

# Deploy the app
cdk deploy DeployStack --profile Dev