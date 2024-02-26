import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.tests import mock_env_configs

@mock.patch.dict(os.environ, mock_env_configs)
class TestRegistryService(TestCase):

    @patch('akello.db.connector.dynamodb.registry_db.put_item')
    def test_create_registry(self, mock_query):
        from akello.services.registry import RegistryService

        mock_query.return_value = {
            'ResponseMetadata': {
                'HTTPStatusCode': 200
            }
        }
        registry_id = RegistryService.create_registry('test', 'test-description', [], [])
        assert mock_query.called
        assert registry_id


    @patch('akello.db.connector.dynamodb.registry_db')
    def test_get_registry(self, mock_query):
        #TODO: need to mock the db to return a mock registry
        pass


   