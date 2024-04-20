import os
from unittest import TestCase, mock
from unittest.mock import patch
from akello.services.tests import mock_env_configs
from akello.db.models.organization import User
from akello.db.models.organization import Organization


@mock.patch.dict(os.environ, mock_env_configs)
class TestOrganization(TestCase):

    @patch('akello.db.connector.dynamodb.registry_db.put_item')
    def test_create_organization(self, mock_query):
        """
        mock_query.return_value = {
            'ResponseMetadata': {
                'HTTPStatusCode': 200
            }
        }

        user = User()
        Organization(
            name='test',
            stripe_customer_id='test-stripe-customer-id',
            created_by=user).create(requesting_user=user)

        assert mock_query.called
        """
        pass
