import os
from datetime import datetime
from typing import List

import boto3

from mbc.domain.model.patient import Patient
from mbc.domain.ports.patient_query_service import PatientQueryService

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')

AKELLO_DYNAMODB_LOCAL_URL = 'http://host.docker.internal:8001'

# use local dynamodb
print("using local dynamodb")
client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)


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


class DynamoDBPatientQueryService(PatientQueryService):


    def __init__(self):
        self.client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
        self.dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
        self.table = self.dynamodb.Table('akello_core')

    def create_patient(self, patient: Patient) -> Patient:
        return self.put_patient(patient)

    def put_patient(self, patient: Patient) -> Patient:
        response = self.table.put_item(
            Item={
                'partition_key': 'patient',
                'sort_key': patient.user_id,
                **patient.model_dump()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
        return patient

    def get_patient(self, patient_id: str) -> Patient:
        response = self.table.get_item(
            Key={
                'partition_key': 'patient',
                'sort_key': patient_id
            }
        )
        item = response.get('Item')
        if item is None:
            return None
        return Patient.model_load(item)