from akello.services import BaseService
from akello.db.connector.dynamodb import registry_db
from akello.db.models import UserRegistry, UserModel, RegistryUser, UserRole, RegistryModel
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from decimal import Decimal
import datetime
import json
from sendgrid import SendGridAPIClient
import os


class UserService(BaseService):
    """
    UserService provides functionalities to manage user information and sessions
    within a database. It includes methods for retrieving user profiles, user sessions,
    creating and updating user information, and checking user access to specific registries.
    """

    @staticmethod
    def get_user(cognito_user_id):
        """
        Retrieves the user profile from the database using the given Cognito user ID.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user to retrieve.

        Returns:
            List[Dict]: A list of items representing the user's profile.

        Raises:
            ClientError: If the query to the database fails.
        """
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('user:%s' % cognito_user_id)
                                       & Key('sort_key').eq('profile')
            )
            return response['Items']
        except ClientError as e:
            print(e)
            print(e.response['No item found'])


    @staticmethod
    def get_user_sessions(cognito_user_id):
        """
        Retrieves the sessions of a user sorted in reverse chronological order.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user whose sessions are to be retrieved.

        Returns:
            List[Dict]: A list of items representing the user's sessions.

        Raises:
            ClientError: If the query to the database fails.
        """
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('user-session:%s' % cognito_user_id),
                ScanIndexForward=False
            )
            return response['Items']
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

    @staticmethod
    def save_user_session(cognito_user_id, user_agent, ip_address):
        """
        Saves a new user session to the database.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user.
            user_agent (str): The user agent string of the user's device.
            ip_address (str): The IP address of the user's device.

        Raises:
            ClientError: If saving the session to the database fails.
        """
        try:
            response = registry_db.put_item(
                Item={
                    "partition_key": 'user-session:%s' % cognito_user_id,
                    "sort_key": str(Decimal(datetime.datetime.utcnow().timestamp())),
                    "user_agent": user_agent,
                    "ip_address": ip_address
                }
            )
            status_code = response['ResponseMetadata']['HTTPStatusCode']
            assert status_code == 200
        except ClientError as e:
            print(e)


    @staticmethod
    def update_profile_photo(cognito_user_id, photo_url):
        """
        Updates the profile photo URL of a user.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user.
            photo_url (str): The new URL of the user's profile photo.
        """
        UserModel.set_attribute("user:%s" % cognito_user_id, "profile", "profile_photo", photo_url)

    @staticmethod
    def create_user(cognito_user_id, email, first_name, last_name, profile_photo):
        """
        Creates a new user in the database.

        Parameters:
            cognito_user_id (str): The Cognito user ID for the new user.
            email (str): The email address of the new user.
            first_name (str): The first name of the new user.
            last_name (str): The last name of the new user.
            profile_photo (str): The URL of the profile photo for the new user.

        Raises:
            ClientError: If the user could not be created in the database.
        """



        # This gets created once a user signs up
        # We need to create the user and assign roles to registeries they are linked to
        response = registry_db.put_item(
            Item={
                "partition_key": 'user:%s' % cognito_user_id,
                "sort_key": 'profile',
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "profile_photo": profile_photo,
                "role": '',
                "is_admin": False,
                "date_created": Decimal(datetime.datetime.utcnow().timestamp()),
                "last_login": Decimal(datetime.datetime.utcnow().timestamp()),
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        sg_api_key = os.environ.get('SENDGRID_API_KEY')
        if sg_api_key:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            data = {
                "contacts": [
                    {
                        "email": email,
                        "first_name": first_name,
                        "last_name": last_name,
                        "custom_fields": {
                        }
                    }
                ]
            }
            response = sg.client.marketing.contacts.put(
                request_body=data
            )

    @staticmethod
    def create_registry_user(registry_id, first_name, last_name, email, user_id, role: UserRole, is_admin: bool):
        """
        Creates a new registry user association in the database.

        Parameters:
            registry_id (str): The ID of the registry.
            first_name (str): The first name of the user.
            last_name (str): The last name of the user.
            email (str): The email of the user.
            user_id (str): The user ID.
            role (UserRole): The role of the user in the registry.
            is_admin (bool): Indicates if the user is an admin.

        Raises:
            ClientError: If the registry user could not be created.
        """
        registry_user = RegistryUser(
            registry_id=registry_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            user_id=user_id,
            role=role,
            is_admin=is_admin
        )

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
        """
        Updates the last login timestamp for a user, effectively setting them as active.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user to update.
        """
        UserModel.set_attribute("user:%s" % cognito_user_id, "profile", "last_login",
                                Decimal(datetime.datetime.utcnow().timestamp()))

    @staticmethod
    def create_user_registry(user_id, registry_id):
        """
        Creates a new user-registry association in the database.

        Parameters:
            user_id (str): The user ID of the user.
            registry_id (str): The registry ID to associate the user with.

        Raises:
            ClientError: If the association could not be created.
        """
        registry_user = UserRegistry(user_id=user_id, registry_id=registry_id)
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
        """
        Creates registry user association in the database.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user.

        Raises:
            ClientError: If the system fails to query the database.
        """
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
                registries.append(
                    RegistryModel(**response['Items'][0])
                )
            return registries
        except ClientError as e:
            print(e)

    @staticmethod
    def check_registry_access(cognito_user_id, registry_id):
        """
        Checks if a user has access to a registry.
        Parameters:
            cognito_user_id (str): The Cognito user ID of the user.
            registry_id (str): The registry ID to associate the user with.

        Returns:
            Raises an exception if the user is not authorized to access the registry.
        """
        try:
            # Look up from registry-user:<registry_id> and user:<cognito_user_id> to see if the user is authorized
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('registry-user:%s' % registry_id)
                                       & Key('sort_key').eq('user:%s' % cognito_user_id)
            )

            if len(response['Items']) != 1:
                raise Exception('The user is not authorized')
            return response['Items'][0]
        except ClientError as e:
            print(e)