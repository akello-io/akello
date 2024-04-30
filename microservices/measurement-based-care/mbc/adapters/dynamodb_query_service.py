import os
import boto3
from typing import Optional, List
from mbc.domain.model.registry import RegistryUser
from mbc.domain.ports.registry_query_service import RegistryQueryService

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')

AKELLO_DYNAMODB_LOCAL_URL = 'http://host.docker.internal:8001'

# use local dynamodb
print("using local dynamodb")
client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)


def create_core_table(db, table_name):
    try:
        print('creating registry table')
        table = db.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    'AttributeName': 'partition_key',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'sort_key',
                    'KeyType': 'RANGE'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'partition_key',
                    'AttributeType': 'S'
                },
                {
                    'AttributeName': 'sort_key',
                    'AttributeType': 'S'
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10
            }
        )
        print("Table status:", table.table_status)
    except Exception as e:
        print(e)
        print("tables probably already exist")


def create_timeseries_table(db, table_name):
    try:
        print('creating timeseries measurements table')
        table = db.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    'AttributeName': 'partition_key',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'timestamp',
                    'KeyType': 'RANGE'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'partition_key',
                    'AttributeType': 'S'
                },
                {
                    'AttributeName': 'timestamp',
                    'AttributeType': 'N'
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10
            }
        )
        print("Table status:", table.table_status)
    except Exception as e:
        print(e)
        print("tables probably already exist")


create_core_table(dynamodb, 'akello_core')
create_timeseries_table(dynamodb, 'akello_timeseries')


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