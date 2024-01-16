import boto3
from unittest.mock import MagicMock
from akello.settings import configs

AWS_ACCESS_KEY_ID = configs['AWS_ACCESS_KEY_ID']['value']
AWS_REGION = configs['AWS_REGION']['value']
AKELLO_DYNAMODB_LOCAL = configs['AKELLO_DYNAMODB_LOCAL']['value']
AKELLO_DYNAMODB_LOCAL_URL = configs['AKELLO_DYNAMODB_LOCAL_URL']['value']
DYNAMODB_TABLE = configs['AWS_DYNAMODB_TABLE']['value']
AWS_SECRET_ACCESS_KEY = configs['AWS_SECRET_ACCESS_KEY']['value']
AKELLO_UNIT_TEST = configs['AKELLO_UNIT_TEST']['value']



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
