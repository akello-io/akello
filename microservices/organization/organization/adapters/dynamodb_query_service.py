from typing import Optional

from mypy_boto3_dynamodb import client

from organization.domain.model.organization import Organization
from organization.domain.ports.inbound import organization_query_service


class DynamoDBProductsQueryService(organization_query_service.OrganizationQueryService):

    def __init__(self, table_name: str, dynamodb_client: client.DynamoDBClient):
        self._table_name = table_name
        self._dynamodb_client = dynamodb_client

    def get(self, organization_id: str) -> Optional[Organization]:
        """Gets a organization from the DynamoDB table."""

        resp = self._dynamodb_client.get_item(
            TableName=self._table_name,
            Key={
                'id': organization_id
            }
        )

        if 'Item' in resp:
            return Organization.parse_obj(resp['Item'])

    def create(self, organization: Organization) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item=organization.dict()
        )

    def set(self, organization: Organization) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item=organization.dict()
        )