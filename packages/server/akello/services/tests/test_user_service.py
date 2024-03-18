import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.tests import mock_env_configs
from akello.services.user import UserService


@mock.patch.dict(os.environ, mock_env_configs)
class TestUserService(TestCase):

    @patch('akello.db.connector.dynamodb.registry_db.query')
    def test_service_get_user(self, mock_query):

        db_data = [{'user-id': 1}]
        mock_query.return_value = {'Items': db_data}
        user_response = UserService.get_user('mock-user-id')
        self.assertEqual(user_response, db_data)

    @patch('akello.db.connector.dynamodb.registry_db.query')
    def test_registry_access_exists(self, mock_query):
        db_data = [{'user-id': 1}]
        mock_query.return_value = {'Items': db_data}
        response = UserService.check_registry_access('mock-user-id', 'mock-registry-id')
        self.assertEqual(response, {'user-id': 1})

    @patch('akello.db.connector.dynamodb.registry_db.query')
    def test_registry_access_does_not_exist(self, mock_query):
        db_data = []
        mock_query.return_value = {'Items': db_data}
        try:
            UserService.check_registry_access('mock-user-id', 'mock-registry-id')
        except Exception as e:
            self.assertEqual(str(e), 'The user is not authorized')
