from typing import Optional

from mypy_boto3_dynamodb import client

from boto3.dynamodb.conditions import Key, Attr

from user.domain.model.user import User
from user.domain.ports.inbound import user_query_service

import logging


class DynamoDBOrganizationQueryService(user_query_service.UserQueryService):


    def __init__(self, table_name: str, dynamodb_client: client.DynamoDBClient):
        self._table_name = table_name
        self._dynamodb_client = dynamodb_client

    def get(self, user_id: str) -> Optional[User]:
        """Gets a user from the DynamoDB table."""

        resp = self._dynamodb_client.get_item(
            TableName=self._table_name,
            Key={
                'partition_key': 'user-id:%s' % user_id,
                'sort_key': 'meta'
            }
        )

        if 'Item' in resp:
            return User.parse_obj(resp['Item'])

    def create(self, user: User) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item={
                'partition_key': 'user-id:%s' % user.id,
                'sort_key': 'meta',
                **user.dict()
            }
        )

    def set(self, user: User) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item={
                'partition_key': 'user-id:%s' % user.id,
                'sort_key': 'meta',
                **user.dict()
            }
        )

    def add_organization(self, user_id: str, organization_id: str) -> None:
        self._dynamodb_client.put_item(
            TableName=self._table_name,
            Item={
                'partition_key': 'user-id:%s' % user_id,
                'sort_key': 'organization-id:%s' % organization_id,
                'organization_id': organization_id
            }
        )

    def get_organizations(self, user_id: str) -> Optional[str]:
        """Gets a user from the DynamoDB table."""

        resp = self._dynamodb_client.query(
            TableName=self._table_name,
            KeyConditionExpression=Key('partition_key').eq('user-id:%s' % user_id) & Key('sort_key').begins_with('organization-id:')
        )

        return [item['organization_id'] for item in resp['Items']] if 'Items' in resp else None