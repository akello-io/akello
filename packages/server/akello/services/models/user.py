import datetime
import os
from decimal import Decimal

from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from sendgrid import SendGridAPIClient

from akello.db.connector.dynamodb import registry_db
from akello.services import BaseService


class UserService(BaseService):
    """
    UserService provides functionalities to manage user information and sessions
    within a database. It includes methods for retrieving user profiles, user sessions,
    creating and updating user information, and checking user access to specific registries.
    """

    @staticmethod
    def link_user_to_registry(user_id, registry_id):
        """
        Associates a user with a registry.
        """

        pass

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
            Item={"partition_key": 'user:%s' % cognito_user_id, "sort_key": 'profile', "email": email,
                  "first_name": first_name, "last_name": last_name, "profile_photo": profile_photo, "role": '',
                  "is_admin": False, "date_created": Decimal(datetime.datetime.utcnow().timestamp()),
                  "last_login": Decimal(datetime.datetime.utcnow().timestamp()), })
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        sg_api_key = os.environ.get('SENDGRID_API_KEY')
        if sg_api_key:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            data = {
                "contacts": [{"email": email, "first_name": first_name, "last_name": last_name, "custom_fields": {}}]}
            response = sg.client.marketing.contacts.put(request_body=data)

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
                KeyConditionExpression=Key('partition_key').eq('registry-user:%s' % registry_id) & Key('sort_key').eq(
                    'user:%s' % cognito_user_id))

            if len(response['Items']) != 1:
                raise Exception('The user is not authorized')
            return response['Items'][0]
        except ClientError as e:
            print(e)

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
                KeyConditionExpression=Key('partition_key').eq('user:%s' % cognito_user_id) & Key('sort_key').eq(
                    'profile'))
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
                ScanIndexForward=False)
            return response['Items']
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

    @staticmethod
    def set_user_active(cognito_user_id):
        """
        Updates the last login timestamp for a user, effectively setting them as active.

        Parameters:
            cognito_user_id (str): The Cognito user ID of the user to update.
        """
        pass

    @staticmethod
    def get_registries(cognito_user_id):
        pass

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
            response = registry_db.put_item(Item={"partition_key": 'user-session:%s' % cognito_user_id,
                                                  "sort_key": str(Decimal(datetime.datetime.utcnow().timestamp())),
                                                  "user_agent": user_agent,
                                                  "ip_address": ip_address})
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
        pass
