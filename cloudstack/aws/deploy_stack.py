import subprocess

from aws_cdk import (    
    Stack,
    aws_cognito as cognito,
    aws_s3_deployment as s3deploy,
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

import os

class DeployStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, bucket: any, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)        

        
        
        # process = subprocess.Popen(["sh", "../scripts/dev-build-cloudstack-deploy.sh"], env=env_vars)
        # process.wait()
        
        s3deploy.BucketDeployment(
            self, 
            f"DeployStaticSite", 
            sources=[s3deploy.Source.asset(os.path.join(os.getcwd(), "../apps/cocm-registry/dist"))], 
            destination_bucket=bucket
        )         