import os
from unittest.mock import MagicMock
import boto3

DYNAMODB_URL = os.getenv('DYNAMODB_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST') == "True"
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

if AKELLO_UNIT_TEST:
    #client = MagicMock()
    dynamodb = MagicMock()
    # use magicMock
    print("using magicMock")
else:
    #client = boto3.client('dynamodb', endpoint_url=DYNAMODB_URL)
    #dynamodb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)
    # use local dynamodb
    dynamodb = boto3.resource(
        'dynamodb',
        endpoint_url=DYNAMODB_URL,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )
    print("using local dynamodb: %s " % DYNAMODB_URL)
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
