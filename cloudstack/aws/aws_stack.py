from aws_cdk import (    
    Stack
)
from constructs import Construct
from aws.components.storage import S3
from aws.components.storage import DynamoDB
from aws.components.r53 import R53
from aws.components.auth import Cognito
from aws.components.ecr import ECR



class AwsStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Setup DNS
        # R53(self, 'r53_akello.io', name='app.akello.io', zone_name='akello.io')

        # Setup data stores
        DynamoDB(self, 'dynamo_akellodb', table_name='akello-multi-tenant', partition_key='pk', sort_key='sk')
    
        # S3(self, 's3_app.akello.io', bucket_name='app.akello.io')        
        
        # Setup Auth
        Cognito(self, 'cognito_akello', name='akello', user_pool_name='akello')

        # Setup ECR
        ECR(self, 'akello_ecr', name='akello')

        #TODO: Lambdas (docker build)
        #TODO: API Gateway