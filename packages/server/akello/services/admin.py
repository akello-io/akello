from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from akello.services import BaseService
from akello.dynamodb import registry_db


class AdminService(BaseService):


    @staticmethod
    def scan_users():
        users = []
        scan_kwargs = {
            "FilterExpression": Key("partition_key").begins_with('user:') & Key('sort_key').eq('profile')
        }
        try:
            done = False
            start_key = None
            while not done:
                if start_key:
                    scan_kwargs["ExclusiveStartKey"] = start_key
                response = registry_db.scan(**scan_kwargs)
                users.extend(response.get("Items", []))
                start_key = response.get("LastEvaluatedKey", None)
                done = start_key is None
        except ClientError as err:
            raise

        return users

    @staticmethod
    def scan_user_registeries():
        user_registry = []
        scan_kwargs = {
            "FilterExpression": Key("partition_key").begins_with('user-registry:') & Key('sort_key').begins_with('registry:')
        }
        try:
            done = False
            start_key = None
            while not done:
                if start_key:
                    scan_kwargs["ExclusiveStartKey"] = start_key
                response = registry_db.scan(**scan_kwargs)
                user_registry.extend(response.get("Items", []))
                start_key = response.get("LastEvaluatedKey", None)
                done = start_key is None
        except ClientError as err:
            raise

        return user_registry

    @staticmethod
    def scan_registry():
        registeries = []
        scan_kwargs = {
            "FilterExpression": Key("partition_key").begins_with('registry:') & Key('sort_key').eq('metadata')
        }
        try:
            done = False
            start_key = None
            while not done:
                if start_key:
                    scan_kwargs["ExclusiveStartKey"] = start_key
                response = registry_db.scan(**scan_kwargs)
                registeries.extend(response.get("Items", []))
                start_key = response.get("LastEvaluatedKey", None)
                done = start_key is None
        except ClientError as err:
            raise

        return registeries

