
## Setup DynamoDB on your local environment

### Setup NoSQL Workbench
1. Download and install NoSQL Workbench over here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html
2. Once you installed NoSQL Workbench, run DynamoDB locally

### Set your environment variables
```commandline
export AKELLO_ENV=LOCAL
export AWS_REGION=## 
export AWS_SECRET_NAME=##  
export AWS_SECRET_SERVICE=##
export AWS_ACCESS_KEY_ID=##
export AWS_SECRET_ACCESS_KEY=##
export DYNAMODB_TABLE=##
export AWS_COGNITO_USERPOOL_ID=##
export AWS_COGNITO_APP_CLIENT_ID=##
```

### Run the Fast API server

```commandline
python3 -m venv venv 
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```


### temp notes
ECR Push PROD:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 440667844220.dkr.ecr.us-east-1.amazonaws.com
docker build --build-arg settings_env=PROD -t akello.io .
docker tag akello.io:latest 440667844220.dkr.ecr.us-east-1.amazonaws.com/akello.io:latest
docker push 440667844220.dkr.ecr.us-east-1.amazonaws.com/akello.io:latest


aws lambda update-function-code \
           --function-name akello-io-api \
           --image-uri 440667844220.dkr.ecr.us-east-1.amazonaws.com/akello.io:latest


ECR PUSH DEMO:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 440667844220.dkr.ecr.us-east-1.amazonaws.com
docker build -t demo-akello-io .
docker tag demo-akello-io:latest 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest
docker push 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest

aws lambda update-function-code \
           --function-name demo-akello-io \
           --image-uri 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest