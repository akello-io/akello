import subprocess

from aws_cdk import (    
    Stack,
    aws_cognito as cognito,
    CfnOutput
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
from aws.components.api_gateway import ApiGateway

import os

class AwsStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        # Run build    
        #process = subprocess.run(["../scripts/dev-build.sh"]) 
        #process.wait()

        domain = 'akello.io'
        db_table_name = 'akello-multi-tenant'
        aws_region = 'us-east-1'

        # Setup Auth
        cognito_pool = CognitoPool(self, 'cognito_akello', name='akello', user_pool_name='akello')
        cognito_client = CognitoClient(self, 'cognito_client_akello', user_pool=cognito_pool.user_pool, name='app-client')
        

        self.user_pool = cognito_pool.user_pool
        self.user_pool_client = cognito_client.client
        CfnOutput(self, "AWS_COGNITO_USERPOOL_ID", value=cognito_pool.user_pool.user_pool_id)
        CfnOutput(self, "AWS_COGNITO_APP_CLIENT_ID", value=cognito_client.client.user_pool_client_id)
            

        local_envars = os.environ.copy()

        

        # Set Env Vars
        env_vars = {
            'AKELLO_API_URL': f'api.{domain}',
            'AWS_DYNAMODB_TABLE': db_table_name,
            'AWS_COGNITO_USERPOOL_ID': cognito_pool.user_pool.user_pool_id,
            'AWS_COGNITO_APP_CLIENT_ID': cognito_client.client.user_pool_client_id,
        }

        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENV VARS", env_vars)                

        # Update environment variables
        for key, value in env_vars.items():
            local_envars[key] = value


        # Setup DNS
        r53 = R53(self, 'app_r53_akello.io', zone_name=domain)

        # Setup data stores
        DynamoDB(self, 'dynamo_akellodb', table_name='akello-multi-tenant', partition_key='partition_key', sort_key='sort_key')

        # Setup Lambda         
        self.fn_lambda = fn_Lambda(
            self, 
            'fn_akello_api', 
            lambda_name='akello-api', 
            path='../servers/api-server', 
            dockerfile='Dockerfile.aws.lambda', 
            lambda_env=env_vars
        )

        ApiGateway(self, 'api_gateway_akello', name='akello-api', fn_lambda=self.fn_lambda.fn_lambda)

        #TODO: API Gateway
        #  - build the open api spec
        #  - create the api gateway
        #  - connect the lambda to the api gateway

         # Setup a static stie
        # - sets up S3, CloudFront
        self.deploy_static_site = DeployStaticSite(self, 'app.akello.io', subdomain='app-dev', domain=domain, public_hosted_zone=r53.public_hosted_zone, env_vars=local_envars)        
        

            
        