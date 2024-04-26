import boto3

from _old._old_user import DynamoDBProductsQueryService
from _old._old_user import User

ddb = boto3.resource('dynamodb', endpoint_url='http://localhost:8001')
client = ddb.meta.client
response = client.list_tables()

# Create the table
# from db.dynamodb_table import UserDynamoDBTable
# UserDynamoDBTable(ddb).create_table(table_name='test-ak-user')

client.get_item(TableName='test-ak-user', Key={
    'id': 'test'
})

DynamoDBProductsQueryService('test-ak-user', client).create(User(
    id='id',
    email='vijay@g.com',
    first_name='first-name',
    last_name='last-name',
    picture='',
    phone_number=''
))

DynamoDBProductsQueryService('test-ak-user', client).get('id')
