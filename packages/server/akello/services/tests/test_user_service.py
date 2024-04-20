import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.tests import mock_env_configs


@mock.patch.dict(os.environ, mock_env_configs)
class TestUserService(TestCase):

    @patch('akello.db.connector.dynamodb.registry_db.query')
    def test_service_get_user(self, mock_query):
        pass

    @patch('akello.db.connector.dynamodb.registry_db.query')
    def test_registry_access_exists(self, mock_query):
        pass

    @patch('akello.db.connector.dynamodb.registry_db.query')
    def test_registry_access_does_not_exist(self, mock_query):
        pass