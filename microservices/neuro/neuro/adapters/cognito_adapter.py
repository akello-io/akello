# app/adapters/cognito_adapter.py
import boto3
from botocore.exceptions import ClientError
from app.domain.ports.auth_provider_port import AuthProviderPort

class CognitoAdapter(AuthProviderPort):
    def __init__(self, user_pool_id, region_name='us-west-2'):
        self.user_pool_id = user_pool_id
        self.client = boto3.client('cognito-idp', region_name=region_name)

    def register_service(self, app_client_name: str) -> dict:
        try:
            response = self.client.list_user_pool_clients(
                UserPoolId=self.user_pool_id,
                MaxResults=60
            )

            for client in response['UserPoolClients']:
                if client['ClientName'] == app_client_name:
                    client_details = self.client.describe_user_pool_client(
                        UserPoolId=self.user_pool_id,
                        ClientId=client['ClientId']
                    )
                    return {
                        'client_id': client_details['UserPoolClient']['ClientId'],
                        'client_secret': client_details['UserPoolClient'].get('ClientSecret')
                    }

            # Create a new app client
            new_client_response = self.client.create_user_pool_client(
                UserPoolId=self.user_pool_id,
                ClientName=app_client_name,
                GenerateSecret=True,
                AllowedOAuthFlows=['client_credentials'],
                AllowedOAuthScopes=['aws.cognito.signin.user.admin'],
                SupportedIdentityProviders=['COGNITO'],
            )

            return {
                'client_id': new_client_response['UserPoolClient']['ClientId'],
                'client_secret': new_client_response['UserPoolClient'].get('ClientSecret')
            }

        except ClientError as e:
            print(f"Error interacting with AWS Cognito: {e}")
            raise
