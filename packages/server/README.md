### Set your environment variables
```commandline
export AWS_REGION=## 
export AWS_SECRET_NAME=##  
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
uvicorn akello.main:app --reload --proxy-headers
```