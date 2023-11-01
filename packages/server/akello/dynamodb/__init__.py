import boto3
from akello.settings import DYNAMODB_TABLE, AKELLO_ENV, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

if AKELLO_ENV != 'LOCAL':
    client = boto3.client('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    dynamodb = boto3.resource('dynamodb', aws_access_key_id=AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
else:
    client = boto3.client('dynamodb', endpoint_url="http://localhost:8001")
    dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8001")


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
