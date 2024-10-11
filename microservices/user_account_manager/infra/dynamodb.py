import os
from unittest.mock import MagicMock
import boto3
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

DYNAMODB_URL = os.getenv('DYNAMODB_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')

AWS_PROFILE = os.getenv('AWS_PROFILE')

# use local dynamodb
logger.info("Using local DynamoDB: %s", DYNAMODB_URL)
logger.info("Using AWS Profile: %s", AWS_PROFILE)


if AKELLO_UNIT_TEST:
    #client = MagicMock()
    dynamodb = MagicMock()
else:
    #client = boto3.client('dynamodb', endpoint_url=DYNAMODB_URL)
    dynamodb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_URL)


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
                {
                    'AttributeName': 'email',
                    'AttributeType': 'S'  # Ensure email is defined as String (S)
                }
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'EmailIndex',
                    'KeySchema': [
                        {
                            'AttributeName': 'email',
                            'KeyType': 'HASH'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 10,
                        'WriteCapacityUnits': 10
                    }
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10
            }
        )
        table.wait_until_exists()
        print("Table status:", table.table_status)
    except Exception as e:
        print(e)
        print("tables probably already exist")


if not AKELLO_UNIT_TEST:
    create_core_table(dynamodb, 'akello_core')
