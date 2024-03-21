from aws_cdk import (    
    Stack,
    aws_s3_deployment as s3deploy,
)
from constructs import Construct

import os

class DeployStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, bucket: any, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)        

        s3deploy.BucketDeployment(
            self, 
            f"DeployStaticSite", 
            sources=[s3deploy.Source.asset(os.path.join(os.getcwd(), "../app/dist"))], 
            destination_bucket=bucket
        )         