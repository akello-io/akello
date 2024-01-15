import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.registry import RegistryService
from akello.dynamodb.models.registry import RegistryModel

@mock.patch.dict(os.environ, {
    "AKELLO_API_URL": "TRUE",
    "AKELLO_UNIT_TEST": "TRUE",
    "AKELLO_COGNITO_LOCAL": "TRUE",
    "AKELLO_COGNITO_URL": "http://localhost:9229",
    "AKELLO_DYNAMODB_LOCAL": "TRUE",
    "AKELLO_DYNAMODB_LOCAL_URL": "=http://localhost:8001",
    "AWS_ACCESS_KEY_ID": "UnitTestLocalDB",
    "AWS_ACCOUNT_ID": "x",
    "AWS_BUCKET": "x",
    "AWS_CLOUD_FRONT_DISTRIBUTION": "x",
    "AWS_COGNITO_APP_CLIENT_ID": "x",
    "AWS_COGNITO_USERPOOL_ID": "x",
    "AWS_DYNAMODB_TABLE": "x",
    "AWS_REGION": "x",
    "AWS_SECRET_ACCESS_KEY": "x",
    "AWS_SECRET_NAME": "x",
    "AWS_STORYBOOK_BUCKET": "x",
})
class TestRegistryService(TestCase):

    @patch('akello.dynamodb.registry_db')
    def test_create_registry(self, mock_query):
        registry_id = RegistryService.create_registry('test', [], 'test')

        assert registry_id is not None
        registry = RegistryService.get_registry(registry_id)
        loaded_registry = RegistryModel(**registry)
        assert loaded_registry.id == registry_id
        assert loaded_registry.name == 'test'
        assert loaded_registry.questionnaires == []

    """
    @patch('akello.dynamodb.registry_db')
    def test_get_registry(self, mock_query):
        raise Exception('Not implemented')

    @patch('akello.dynamodb.registry_db')
    def test_update_stats(self, mock_query):
        raise Exception('Not implemented')

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
