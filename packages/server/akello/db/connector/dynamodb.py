import os
from unittest.mock import MagicMock

import boto3
from botocore.exceptions import ClientError
from pydantic import BaseModel

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')

def create_core_table(dynamodb, table_name):
    try:
        print('creating registry table')
        table = dynamodb.create_table(
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


def create_measurements_table(dynamodb, table_name):
    try:
        print('creating timeseries measurements table')
        table = dynamodb.create_table(
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


def setup_registry_db():
    if AKELLO_UNIT_TEST == 'TRUE':
        print("using mock dynamodb")
        return MagicMock(), MagicMock(), MagicMock()

    if not AKELLO_DYNAMODB_LOCAL_URL:
        print("using real dynamodb")
        client = boto3.client('dynamodb')
        dynamodb = boto3.resource('dynamodb')
        return client, dynamodb, dynamodb.Table('akello_core'), dynamodb.Table('akello_measurements')

    # use local dynamodb
    print("using local dynamodb")
    client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
    dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)

    create_core_table(dynamodb, 'akello_core')
    create_measurements_table(dynamodb, 'akello_measurements')

    return client, dynamodb, dynamodb.Table('akello_core'), dynamodb.Table('akello_measurements')


client, dynamodb, registry_db, measurements_db = setup_registry_db()




class RegistryDBBaseModel(BaseModel):
    @property
    def partition_key(self) -> str:
        return '%s:%s' % (self.object_type, self.id)

    @staticmethod
    def get(partition_key, sort_key):
        try:
            response = registry_db.get_item(
                Key={'partition_key': partition_key, 'sort_key': sort_key})
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        if 'Item' not in response:
            return None

        return response['Item']


    def put(self):
        response = registry_db.put_item(
            Item={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key,
                **self.dict()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def set_attribute(partition_key, sort_key, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = :value"
        ExpressionAttributeValues = {
            ':value': attribute_value
        }
        response = registry_db.update_item(
            Key={
                'partition_key': partition_key,
                'sort_key': sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeValues=ExpressionAttributeValues,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def append_to_attribute(partition_key, sort_key, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = list_append(#att_name, :%s)" % attribute_name
        ExpressionAttributeValues = {
            ':%s' % attribute_name: [attribute_value],
        }
        response = registry_db.update_item(
            Key={
                'partition_key': 'registry-patient:%s' % partition_key,
                'sort_key': sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ExpressionAttributeValues=ExpressionAttributeValues,
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200


    def add_attribute(self, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = :value"
        ExpressionAttributeValues = {
            ':value': attribute_value
        }
        response = registry_db.update_item(
            Key={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeValues=ExpressionAttributeValues,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

