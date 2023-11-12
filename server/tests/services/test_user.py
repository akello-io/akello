import os
from unittest import TestCase, mock
from unittest.mock import patch

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
class TestUserService(TestCase):

    @patch('akello.dynamodb.registry_db')
    def test_service_get_user(self, mock_query):
        from akello.services.user import UserService
        db_data = [{'user-id': 1}]
        mock_query.query.return_value = {'Items': db_data}
        user_response = UserService.get_user('mock-user-id')
        self.assertEqual(user_response, db_data)