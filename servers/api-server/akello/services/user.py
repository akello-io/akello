from akello.services import BaseService
from akello.dynamodb import registry_db
from akello.dynamodb.models.user import UserRegistry, UserModel, RegistryUser, UserEmail, UserRole
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from decimal import Decimal
import datetime
import json


class UserService(BaseService):

    @staticmethod
    def get_user(cognito_user_id):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('user:%s' % cognito_user_id)
                                       & Key('sort_key').eq('profile')
            )
        except ClientError as e:
            print(e)
            print(e.response['No item found'])
        else:
            return response['Items']

    @staticmethod
    def create_user(cognito_user_id, email):

        # This gets created once a user signs up
        # We need to create the user and assign roles to registeries they are linked to

        response = registry_db.put_item(
            #TODO: Need to generate the Item Object using the data model
            Item={
                "partition_key": 'user:%s' % cognito_user_id,
                "sort_key": 'profile',
                "email": email,
                "role": '',
                "is_admin": False,
                "date_created": Decimal(datetime.datetime.utcnow().timestamp()),
                "last_login": Decimal(datetime.datetime.utcnow().timestamp()),
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def create_registry_user(registry_id, first_name, last_name, email, user_id, role: UserRole, is_admin: bool):
        registry_user = RegistryUser(
            registry_id=registry_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            user_id=user_id,
            role=role,
            is_admin=is_admin
        )

        # TODO: Need to generate the Item Object using the data model
        item = json.loads(json.dumps(registry_user.model_dump_json()), parse_float=Decimal)
        item = json.loads(item, parse_float=Decimal)
        item['partition_key'] = 'registry-user:' + registry_id
        item['sort_key'] = 'user:' + user_id

        response = registry_db.put_item(
            Item=item
        )

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def set_user_active(cognito_user_id):
        UserModel.set_attribute("user:%s" % cognito_user_id, "profile", "last_login",
                                Decimal(datetime.datetime.utcnow().timestamp()))

    @staticmethod
    def create_user_registry(user_id, registry_id):
        registry_user = UserRegistry(user_id=user_id, registry_id=registry_id)

        # TODO: Need to generate the Item Object using the data model
        item = json.loads(json.dumps(registry_user.model_dump_json()), parse_float=Decimal)
        item = json.loads(item, parse_float=Decimal)
        item['partition_key'] = 'user-registry:' + user_id
        item['sort_key'] = 'registry:' + registry_id

        response = registry_db.put_item(
            Item=item
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def get_registries(cognito_user_id):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('user-registry:%s' % cognito_user_id)
            )

            registries = []
            for registry in response['Items']:
                lookup_key = registry['sort_key']
                response = registry_db.query(
                    KeyConditionExpression=Key('partition_key').eq(lookup_key)
                                           & Key('sort_key').eq('metadata')
                )
                assert len(response['Items']) == 1

                # TODO: Need to generate the Item Object using the data model
                registries.append(
                    {
                        'name': response['Items'][0]['name'],
                        'id': response['Items'][0]['id']
                    }
                )
            return registries

        except ClientError as e:
            print(e)

    # TODO: Static methods in models should move into services
    @staticmethod
    def check_registry_access(cognito_user_id, registry_id):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('registry-user:%s' % registry_id)
                                       & Key('sort_key').eq('user:%s' % cognito_user_id)
            )
        except ClientError as e:
            print(e)

        if len(response['Items']) != 1:
            raise Exception('The user is not authorized')

        return response['Items'][0]