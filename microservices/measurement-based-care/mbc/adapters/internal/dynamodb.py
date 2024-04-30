import os

import boto3

DYNAMODB_URL = os.getenv('DYNAMODB_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')

# use local dynamodb
print("using local dynamodb: %s " % DYNAMODB_URL)
client = boto3.client('dynamodb', endpoint_url=DYNAMODB_URL)
dynamodb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)


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
