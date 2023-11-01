# Foo API


This is an example app of how to run your own API using akello.

## Install Packages
First install the akello package
```commandline
pip install akello
```


## Integrate into FastAPI

Using FastAPI pull in the routes into your FastAPI server
```python
from fastapi import FastAPI
from mangum import Mangum
from akello.api.v1.api import router as api_router

app = FastAPI(docs_url="/docs")
app.include_router(api_router, prefix="/v1")

handler = Mangum(app)

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