import boto3
import os


from organization.adapters.dynamodb_query_service import DynamoDBOrganizationQueryService
from organization.domain.model.organization import Organization

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
from typing import Optional

app = FastAPI()


organization_query_service = DynamoDBOrganizationQueryService('akello-core', client)
@app.post("/")
async def create_organization(organization: Organization) -> None:
    organization_query_service.create(organization)

@app.get("/{organization_id}")
async def get_organization(organization_id: str) -> Optional[Organization]:
    return organization_query_service.get(organization_id)




handler = Mangum(app)
