import os
from unittest import TestCase, mock
from unittest.mock import patch

@mock.patch.dict(os.environ, {
    "AKELLO_ENV": "TEST",
    "AWS_REGION": "x",
    "AWS_SECRET_NAME": "x",
    "AWS_SECRET_SERVICE": "x",
    "AWS_ACCESS_KEY_ID": "x",
    "AWS_SECRET_ACCESS_KEY": "x",
    "DYNAMODB_TABLE": "UnitTestLocalDB",
    "AWS_COGNITO_USERPOOL_ID": "x",
    "AWS_COGNITO_APP_CLIENT_ID": "x",
})
class TestUserService(TestCase):

    @patch('akello.dynamodb.registry_db')
    def test_service_get_user(self, mock_query):
        from akello.services.user import UserService
        db_data = [{'user-id': 1}]
        mock_query.query.return_value = {'Items': db_data}
        user_response = UserService.get_user('mock-user-id')
        self.assertEqual(user_response, db_data)