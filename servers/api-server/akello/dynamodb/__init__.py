import boto3
from unittest.mock import MagicMock
import os

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_REGION = os.getenv('AWS_REGION')
AKELLO_DYNAMODB_LOCAL = os.getenv('AKELLO_DYNAMODB_LOCAL')
AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
DYNAMODB_TABLE = os.getenv('AWS_DYNAMODB_TABLE')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')



def setup_registry_db():

    if AKELLO_UNIT_TEST == 'TRUE':
        return MagicMock(), MagicMock(), MagicMock()

    if AKELLO_DYNAMODB_LOCAL == 'TRUE':
        client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
        dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
    else:
        client = boto3.client('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        dynamodb = boto3.resource('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY)


    try:
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

    except:
        print("tables probably already exist")

    return  client, dynamodb, dynamodb.Table(DYNAMODB_TABLE)


client, dynamodb, registry_db = setup_registry_db()
