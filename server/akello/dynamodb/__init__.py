import boto3
from akello.settings import configs

DYNAMODB_ENV = configs['environment_variables']['DYNAMODB_ENV']['value']
DYNAMODB_LOCAL_URL = configs['environment_variables']['DYNAMODB_LOCAL_URL']['value']
DYNAMODB_TABLE = configs['environment_variables']['DYNAMODB_TABLE']['value']
AWS_REGION = configs['environment_variables']['AWS_REGION']['value']


#TODO: We need a better way to do this...
registry_db = None

if DYNAMODB_ENV != 'LOCAL':
    client = boto3.client('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    dynamodb = boto3.resource('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
else:
    client = boto3.client('dynamodb', endpoint_url=DYNAMODB_LOCAL_URL)
    dynamodb = boto3.resource('dynamodb', endpoint_url=DYNAMODB_LOCAL_URL)


def drop_tables():
    try:
        response = client.delete_table(
            TableName=DYNAMODB_TABLE
        )
    except:
        pass

def create_tables():
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

    return dynamodb.Table(DYNAMODB_TABLE)


registry_db = create_tables()
