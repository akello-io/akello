from aws_cdk import (    
    Stack
)
from constructs import Construct
from aws.components.storage import S3
from aws.components.storage import DynamoDB



class AwsStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Setup all the data stores we need

        DynamoDB(self, 'akellodb', table_name='registry', partition_key='pk', sort_key='sk')
        S3(self, 'akello.io', bucket_name='akello.io')
        S3(self, 'app.akello.io', bucket_name='app.akello.io')
        S3(self, 'docs.akello.io', bucket_name='docs.akello.io')

