from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

from akello.db.connector.dynamodb import registry_db
from akello.services import BaseService


class RegistryService(BaseService):

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    # TODO: required roles: ['create registry']
    # the user object should be a validated one. Meaning there is no way its directly
    # from a web request where a user can set their roles
    @staticmethod
    def create_registry(name, description, questionnaires, integrations, logo_url=None):
        pass

    @staticmethod
    def get_registry(registry_id):

        try:
            response = registry_db.get_item(Key={'partition_key': 'registry:%s' % registry_id, 'sort_key': 'metadata'})
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        return response['Item']

    @staticmethod
    def set_stripe_customer_id(registry_id, stripe_customer_id):
        pass

    @staticmethod
    def update_registry_akello_apps(registry_id, akello_apps):
        pass

    @staticmethod
    def set_measurements(registry_id, measurements):
        pass

    @staticmethod
    def update_stats(registry_id):
        pass

    @staticmethod
    def get_patient(registry_id, patient_id):
        try:
            response = registry_db.get_item(
                Key={'partition_key': 'registry-patient:%s' % registry_id, 'sort_key': patient_id})
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        if 'Item' not in response:
            return None

        return response['Item']

    @staticmethod
    def get_patients(registry_id, flag=None):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('registry-patient:%s' % registry_id))
        except ClientError as e:
            print(e)
            print(e.response['No item found'])
        else:
            return response['Items']

    @staticmethod
    def get_members(registry_id):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('registry-user:%s' % registry_id))
            return response['Items']
        except ClientError as e:
            print(e)
