import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.tests import mock_env_configs

@mock.patch.dict(os.environ, mock_env_configs)
class TestRegistryService(TestCase):

    @patch('akello.dynamodb.registry_db.put_item')
    def test_create_registry(self, mock_query):
        from akello.services.registry import RegistryService

        mock_query.return_value = {
            'ResponseMetadata': {
                'HTTPStatusCode': 200
            }
        }
        registry_id = RegistryService.create_registry('test', [], [])
        assert mock_query.called
        assert registry_id


    @patch('akello.dynamodb.registry_db')
    def test_get_registry(self, mock_query):
        #TODO: need to mock the db to return a mock registry
        pass


    @patch('akello.dynamodb.registry_db')
    def test_update_stats(self, mock_query):
        """
        Mock out get_patients and get_members. Set the total patients/members
        call update stats
        assert the member and patient count is correct
        """
        pass

    """
    @patch('akello.dynamodb.registry_db')
    def test_get_patients(self, mock_query):
        raise Exception('Not implemented')

    @patch('akello.dynamodb.registry_db')
    def test_refer_patient(self, mock_query):
        raise Exception('Not implemented')

    @patch('akello.dynamodb.registry_db')
    def add_treatment_log(self, mock_query):
        raise Exception('Not implemented')

    @patch('akello.dynamodb.registry_db')
    def get_member(self, mock_query):
        raise Exception('Not implemented')
    """
