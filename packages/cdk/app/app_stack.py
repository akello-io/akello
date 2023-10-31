from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
)
from aws_cdk import RemovalPolicy
from constructs import Construct
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_dynamodb as dynamodb


class AppStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)


        dynamodb.TableV2(self, "TestTable",
            partition_key=dynamodb.Attribute(name="pk", type=dynamodb.AttributeType.STRING),
            contributor_insights=True,
            table_class=dynamodb.TableClass.STANDARD_INFREQUENT_ACCESS,
            point_in_time_recovery=True
         )

        # Static content for docs will be hosted from
        s3.Bucket(
            self,
            id="docs.akello.io",
            website_index_document='index.html',
            website_error_document='error.html',
            # public_read_access=True
        )

        # Static content for the public (marketing) website
        s3.Bucket(
            self,
            id="akello.io",
            website_index_document='index.html',
            website_error_document='error.html',
            # public_read_access=True
        )

        # Static content for the core web app
        s3.Bucket(
            self,
            id="app.akello.io",
            website_index_document='index.html',
            website_error_document='error.html',
            # public_read_access=True
        )
