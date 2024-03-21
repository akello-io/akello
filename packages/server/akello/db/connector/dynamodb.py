import boto3
from unittest.mock import MagicMock
from pydantic import BaseModel
import os

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
DYNAMODB_TABLE = os.getenv('AWS_DYNAMODB_TABLE')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')


def setup_registry_db():
    if AKELLO_UNIT_TEST == 'TRUE':
        print("using mock dynamodb")
        return MagicMock(), MagicMock(), MagicMock()
    
    if not AKELLO_DYNAMODB_LOCAL_URL:
        print("using real dynamodb")
        client = boto3.client('dynamodb')
        dynamodb = boto3.resource('dynamodb')
        DYNAMODB_TABLE = os.getenv('AWS_DYNAMODB_TABLE')
        return client, dynamodb, dynamodb.Table(DYNAMODB_TABLE)

    # use local dynamodb
    print("using local dynamodb")

    client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
    dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
    
    try:            
        DYNAMODB_TABLE = os.getenv('AWS_DYNAMODB_TABLE')
        #client.delete_table(TableName=DYNAMODB_TABLE)
        print('creating registry table')
        table = dynamodb.create_table(
            TableName=DYNAMODB_TABLE,
            KeySchema=[
                {
                    'AttributeName': 'partition_key',  # registry_id, auth_user_id
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
        
    return client, dynamodb, dynamodb.Table(DYNAMODB_TABLE)

client, dynamodb, registry_db = setup_registry_db()

class RegistryDBBaseModel(BaseModel):
    @property
    def partition_key(self) -> str:
        return '%s:%s' % (self.object_type, self.id)

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