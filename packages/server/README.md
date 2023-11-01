
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
