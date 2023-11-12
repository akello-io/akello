import boto3
from akello.settings import configs

AWS_ACCESS_KEY_ID = configs['AWS_ACCESS_KEY_ID']['value']
AWS_REGION = configs['AWS_REGION']['value']
AKELLO_DYNAMODB_LOCAL = configs['AKELLO_DYNAMODB_LOCAL']['value']
AKELLO_DYNAMODB_LOCAL_URL = configs['AKELLO_DYNAMODB_LOCAL_URL']['value']
DYNAMODB_TABLE = configs['AWS_DYNAMODB_TABLE']['value']
AWS_SECRET_ACCESS_KEY = configs['AWS_SECRET_ACCESS_KEY']['value']


#TODO: We need a better way to do this...
registry_db = None

if AKELLO_DYNAMODB_LOCAL == 'TRUE':
    client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
    dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
else:
    client = boto3.client('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    dynamodb = boto3.resource('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=AWS_SECRET_ACCESS_KEY)



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
