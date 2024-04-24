import boto3
import os

from user.adapters import dynamodb_query_service
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

user_query_service = dynamodb_query_service.DynamoDBOrganizationQueryService('akello-core', client)


@app.get("/{user_id}")
async def get_user(user_id: str):
    return user_query_service.get(user_id)


@app.post("/")
async def create_user(user: User):
    return user_query_service.create(user)

@app.get("/{user_id}/organization")
async def get_organizations(user_id: str):
    return user_query_service.get_organizations(user_id)

@app.post("/{user_id}/organization")
async def add_organization(user_id: str, organization_id: str):
    user_query_service.add_organization(user_id, organization_id)
    return None

handler = Mangum(app)

