import boto3
import os

from adapters.dynamodb_query_service import DynamoDBProductsQueryService
from domain.model.user import User

DYNAMODB_URL = os.getenv('DYNAMODB_URL')

if DYNAMODB_URL:
    print('>>>>>>>>>>>>> using local dynamodb')
    ddb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)
else:
    ddb = boto3.resource('dynamodb')

client = ddb.meta.client
response = client.list_tables()


from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()


@app.get("/{user_id}")
async def get_user(user_id: str):
    user = DynamoDBProductsQueryService('User', client).get(user_id)
    return user


@app.post("/")
async def create_user(user: User):
    DynamoDBProductsQueryService('User', client).create(user)
    return user

handler = Mangum(app)

