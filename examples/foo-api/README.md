# Foo API


This is an example app of how to run your own API using akello.

## Quick Start

If you already have **DynamoDB** running locally, an AWS account and the **environment variables** set (see below) then you just need to run the following commands.

```commandline
pip install -r requirements.text
uvicorn main:app --reload
```

The server will be running on http://localhost:8000


## Install akello and integrate into your Fast API server

```commandline
pip install akello
```

Add the API routes from akello into your FastAPI server (main.py)
```python
from akello.api.v1.api import router as api_router
```

## Setup NoSQL Workbench
1. Download and install NoSQL Workbench over here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html
2. Once you installed NoSQL Workbench, run DynamoDB locally

## Setup your environment variables

```commandline
export AKELLO_ENV=LOCAL                         # make sure to set to LOCAL for local dev
export AWS_REGION=#
export AWS_ACCESS_KEY_ID=#
export AWS_SECRET_ACCESS_KEY=#
export DYNAMODB_TABLE=<<Set to your local dynamodb table>>
export AWS_COGNITO_USERPOOL_ID=#
export AWS_COGNITO_APP_CLIENT_ID=#
```

## Run the local server

Run the local FastAPI server once DynamoDB is running and you have your envionrment vairables set.

```commandline
uvicorn main:app --reload
```

## Support

Feel free to reach out to us at **support@akello.io** or at our [Discord](https://discord.gg/36PRxDqq).