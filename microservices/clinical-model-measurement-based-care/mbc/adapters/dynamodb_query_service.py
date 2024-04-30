from typing import Optional

from mbc.adapters.internal.dynamodb import *
from mbc.domain.model.registry import RegistryUser, Registry
from mbc.domain.ports.registry_query_service import RegistryQueryService

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('DYNAMODB_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')


class DynamoDBRegistryQueryService(RegistryQueryService):

    def __init__(self):
        self.client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
        self.dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
        self.table = self.dynamodb.Table('akello_core')

    def add_registry_user(self, registry_user: RegistryUser) -> Optional[RegistryUser]:
        response = self.table.put_item(
            Item={
                'partition_key': 'registry-id:%s' % registry_user.registry_id,
                'sort_key': 'user-id:%s' % registry_user.user_id,
                **registry_user.model_dump()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
        return registry_user

    def get_registry_user(self, registry_id: str, user_id: str) -> Optional[RegistryUser]:
        response = self.table.get_item(
            Key={
                'partition_key': 'registry-id:%s' % registry_id,
                'sort_key': 'user-id:%s' % user_id
            }
        )
        item = response.get('Item')
        if item:
            return RegistryUser(**item)
        return None

    def create_registry(self, registry: Registry) -> Optional[Registry]:
        response = self.table.put_item(
            Item={
                'partition_key': 'registry-id:%s' % registry.id,
                'sort_key': 'meta',
                **registry.model_dump()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
        return registry

    def get_registry(self, registry_id: str) -> Optional[Registry]:
        response = self.table.get_item(
            Key={
                'partition_key': 'registry-id:%s' % registry_id,
                'sort_key': 'meta'
            }
        )
        item = response.get('Item')
        if item:
            return Registry(**item)
        return None
