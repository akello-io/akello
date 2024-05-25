import os
from unittest.mock import MagicMock
import boto3

DYNAMODB_URL = os.getenv('DYNAMODB_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')

# use local dynamodb
print("using local dynamodb: %s " % DYNAMODB_URL)

if AKELLO_UNIT_TEST:
    #client = MagicMock()
    dynamodb = MagicMock()
else:
    #client = boto3.client('dynamodb', endpoint_url=DYNAMODB_URL)
    dynamodb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)
    pass


def create_core_table(db, table_name):
    try:
        print('creating user table')
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


if not AKELLO_UNIT_TEST:
    create_core_table(dynamodb, 'akello_core')
