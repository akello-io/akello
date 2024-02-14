import subprocess

from aws_cdk import (    
    Stack,
    aws_cognito as cognito,
)
from constructs import Construct
from aws.components.storage import S3
from aws.components.storage import DynamoDB
from aws.components.r53 import R53
from aws.components.cognito_pool import CognitoPool
from aws.components.cognito_client import CognitoClient
from aws.components.ecr import ECR
from aws.components.fn_lambda import fn_Lambda
from aws.components.deploy_static_site import DeployStaticSite


class AwsStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Run build    
        #process = subprocess.run(["../scripts/dev-build.sh"]) 
        #process.wait()


        # Setup DNS
        R53(self, 'r53_akello.io', name='app.akello.io', zone_name='akello.io')

        # Setup data stores
        DynamoDB(self, 'dynamo_akellodb', table_name='akello-multi-tenant', partition_key='partition_key', sort_key='sort_key')
    
        # Setup Storage
        # S3(self, 's3_app.akello.io', bucket_name='app.akello.io')
               

        DeployStaticSite(self, 'app.akello.io', name='app.akello.io')

        # Setup Auth
        cognito_pool = CognitoPool(self, 'cognito_akello', name='akello', user_pool_name='akello')
        cognito_client = CognitoClient(self, 'cognito_client_akello', user_pool=cognito_pool.user_pool, name='app-client')

        # Setup Lambda         
        fn_Lambda(
            self, 
            'fn_akello_api', 
            lambda_name='akello-api', 
            path='../servers/api-server', 
            dockerfile='Dockerfile.aws.lambda', 
            lambda_env={
                'AWS_DYNAMODB_TABLE': 'akello-multi-tenant',
                'AWS_COGNITO_USERPOOL_ID': cognito_pool.user_pool.user_pool_id,
                'AWS_COGNITO_APP_CLIENT_ID': cognito_client.client.user_pool_client_id
            }
        )        
        

        # Setup ECR
        # ECR(self, 'akello_ecr', name='akello')

        #TODO: Lambdas (docker build)
        #TODO: API Gateway


            
        