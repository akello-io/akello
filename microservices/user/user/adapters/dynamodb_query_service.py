from typing import Optional

from mypy_boto3_dynamodb import client

from domain.model.user import User
from domain.ports.inbound import user_query_service


class DynamoDBProductsQueryService(user_query_service.UserQueryService):

    def __init__(self, table_name: str, dynamodb_client: client.DynamoDBClient):
        self._table_name = table_name
        self._dynamodb_client = dynamodb_client

    def get(self, user_id: str) -> Optional[User]:
        """Gets a user from the DynamoDB table."""

        resp = self._dynamodb_client.get_item(
            TableName=self._table_name,
            Key={
                'id': user_id
            }
        )

        if 'Item' in resp:
            return User.parse_obj(resp['Item'])

    def create(self, user: User) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item=user.dict()
        )

    def set(self, user: User) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item=user.dict()
        )