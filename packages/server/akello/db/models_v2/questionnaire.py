from fhir.resources.questionnaire import Questionnaire as FHIRQuestionnaire
from akello.db.connector.dynamodb import registry_db
from flatten_json import flatten
from boto3.dynamodb.conditions import Key

import json

class Questionnaire(FHIRQuestionnaire):

    @property
    def partition_key(self) -> str:
        return f'questionnaire:{self.resource_type}'

    @property
    def sort_key(self) -> str:
        return self.name

    @staticmethod
    def fetch_questionnaires(partition_key, sort_key):
        """
        Load the item from the database
        """
        response = registry_db.get_item(
            Key={
                'partition_key': partition_key,
                'sort_key': sort_key
            }
        )
        item = response.get('Item')
        del item['partition_key']
        del item['sort_key']
        
        if item:
            return Questionnaire(**item)

    def put(self):
        """
        Protected method to put the item in the database
        """
        flat = flatten(json.loads(self.json()))
        response = registry_db.put_item(
            Item={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key,
                **flat
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

