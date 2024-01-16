import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.tests import mock_env_configs

@mock.patch.dict(os.environ, mock_env_configs)
class TestUserService(TestCase):

    @patch('akello.dynamodb.registry_db')
    def test_service_get_user(self, mock_query):
        from akello.services.user import UserService

        db_data = [{'user-id': 1}]
        mock_query.query.return_value = {'Items': db_data}
        user_response = UserService.get_user('mock-user-id')
        self.assertEqual(user_response, db_data)