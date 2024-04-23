import boto3
import os

from user.adapters.dynamodb_query_service import DynamoDBOrganizationQueryService
from user.domain.model.user import User

DYNAMODB_URL = os.getenv('DYNAMODB_URL')

if DYNAMODB_URL:
    print('>>>>>>>>>>>>> using local dynamodb')
    ddb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)
else:
    ddb = boto3.resource('dynamodb')

client = ddb.meta.client

from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()


@app.get("/{user_id}")
async def get_user(user_id: str):
    user = DynamoDBOrganizationQueryService('akello-core', client).get(user_id)
    return user


@app.post("/")
async def create_user(user: User):
    DynamoDBOrganizationQueryService('akello-core', client).create(user)
    return user

handler = Mangum(app)

