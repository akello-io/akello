import boto3
import os

from _old._old_user import dynamodb_query_service
from _old._old_user import User

DYNAMODB_URL = os.getenv('DYNAMODB_URL')

if DYNAMODB_URL:
    print('>>>>>>>>>>>>> using local dynamodb')
    ddb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)
else:
    ddb = boto3.resource('dynamodb')

client = ddb.meta.client

from fastapi import FastAPI
from mangum import Mangum

from _old._old_user import commands
from _old._old_user import create_user_command_handler, get_user_command_handler, create_user_organization_handler, get_user_organization_handler

app = FastAPI()
user_query_service = dynamodb_query_service.DynamoDBOrganizationQueryService('akello-core', client)

@app.get("/{user_id}")
async def get_user(user_id: str):
    command = commands.get_user_command.GetUserCommand(user_id=user_id)
    return get_user_command_handler.handle_get_user_command(command, user_query_service)

@app.post("/")
async def create_user(user: User):
    comand = commands.create_user_command.CreateUserCommand(**user.model_dumps())
    return create_user_command_handler.handle_create_user_command(comand, user_query_service)

@app.get("/{user_id}/organization")
async def get_organizations(user_id: str):
    command = commands.get_user_organization.GetUserOrganizationCommand(user_id=user_id, organization_id=None)
    return get_user_organization_handler.handle_get_user_organization_command(command, user_query_service)

@app.post("/{user_id}/organization")
async def add_organization(user_id: str, organization_id: str):
    command = commands.add_organization_command.AddOrganizationCommand(user_id=user_id, organization_id=organization_id)
    return create_user_organization_handler.handle_add_organization_command(command, user_query_service)

handler = Mangum(app)

