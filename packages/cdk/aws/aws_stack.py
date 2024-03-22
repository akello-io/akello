from aws_cdk import Stack, CfnOutput
from constructs import Construct
from aws.components.storage import DynamoDB
from aws.components.r53 import R53
from aws.components.cognito_pool import CognitoPool
from aws.components.cognito_client import CognitoClient
from aws.components.fn_lambda import fn_Lambda
from aws.components.deploy_static_site import DeployStaticSite
from aws.components.api_gateway import ApiGateway

class AwsStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Parameters 
        # TODO: convert these to command line arguments
        domain = 'akello.io'
        db_table_name = 'akello'
        

        # Setup cognito and get user pool and client id's
        cognito_pool = CognitoPool(self, 'cognito_akello', name='akello', user_pool_name='akello')
        cognito_client = CognitoClient(self, 'cognito_client_akello', user_pool=cognito_pool.user_pool, name='app-client')
            
        # Set environment variables
        env_vars = {
            'AKELLO_API_URL': f'api.{domain}',
            'AWS_DYNAMODB_TABLE': db_table_name,
            'AWS_COGNITO_USERPOOL_ID': cognito_pool.user_pool.user_pool_id,
            'AWS_COGNITO_APP_CLIENT_ID': cognito_client.client.user_pool_client_id,
        }                

                
        # Create the resources
        r53 = R53(self, 'R53.io', zone_name=domain)
        dynamodb = DynamoDB(self, 'DynamoDB', table_name=db_table_name, partition_key='partition_key', sort_key='sort_key')
        
        fn_lambda = fn_Lambda(
            self,
            'fn_akello_api',
            lambda_name='akello-api',
            path='../server',                        
            dockerfile='Dockerfile.aws.lambda',
            lambda_env=env_vars
        )
        
        self.api_gateway = ApiGateway(self, 'ApiGateway', name='akello-api', fn_lambda=fn_lambda.fn_lambda)        
        self.deploy_static_site = DeployStaticSite(self, 'DeployStaticSite', subdomain='app', domain=domain, public_hosted_zone=r53.public_hosted_zone)
        
        # Grant permissions
        dynamodb.table.grant_read_write_data(fn_lambda.fn_lambda)
        
        
        # Outputs
        #CfnOutput(self, "AWS_API_GATEWAY", value=self.api_gateway.api.url)
        CfnOutput(self, "AWS_COGNITO_USERPOOL_ID", value=cognito_pool.user_pool.user_pool_id)
        CfnOutput(self, "AWS_COGNITO_APP_CLIENT_ID", value=cognito_client.client.user_pool_client_id)
        CfnOutput(self, "AWS_CLOUDFRONT_URL", value=self.deploy_static_site.distribution.domain_name)                