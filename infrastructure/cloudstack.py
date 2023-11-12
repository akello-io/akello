#!/usr/bin/env python3
import os

import aws_cdk as cdk

from aws_cdk import (
  Stack,
  aws_apigateway,
  aws_cognito,
  aws_lambda,
  aws_dynamodb,
  aws_iam,
  aws_s3 as s3
)
from constructs import Construct


class AkelloStack(Stack):

  def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
    super().__init__(scope, construct_id, **kwargs)
    self.dynamo_db()
    self.s3_buckets()

  def dynamo_db(self):
    ddb_table = aws_dynamodb.Table(self, "DynamoDbTable",
                                   table_name='TEST_TABLE',
                                   removal_policy=cdk.RemovalPolicy.DESTROY,
                                   partition_key=aws_dynamodb.Attribute(name="partition_key",
                                                                        type=aws_dynamodb.AttributeType.STRING),
                                   time_to_live_attribute="ttl",
                                   billing_mode=aws_dynamodb.BillingMode.PROVISIONED,
                                   read_capacity=15,
                                   write_capacity=5,
                                   )

    ddb_access_policy_doc = aws_iam.PolicyDocument()
    ddb_access_policy_doc.add_statements(aws_iam.PolicyStatement(**{
      "effect": aws_iam.Effect.ALLOW,
      "resources": [ddb_table.table_arn],
      "actions": [
        "dynamodb:DeleteItem",
        "dynamodb:PartiQLInsert",
        "dynamodb:UpdateTimeToLive",
        "dynamodb:BatchWriteItem",
        "dynamodb:PutItem",
        "dynamodb:PartiQLUpdate",
        "dynamodb:UpdateItem",
        "dynamodb:PartiQLDelete"
      ]
    }))
    cdk.CfnOutput(self, "DynamoDBTableName", value=ddb_table.table_name)

  def s3_buckets(self):
    bucket = s3.Bucket(self, "test1-MyBucket",
      bucket_name="test1-my-unique-bucket-name",  # specify a unique bucket name
      versioned=True,  # enable versioning for the bucket
      removal_policy=cdk.RemovalPolicy.DESTROY,
      encryption=s3.BucketEncryption.S3_MANAGED  # use S3-managed encryption
    )

    bucket = s3.Bucket(self, "test2-MyBucket",
      bucket_name="test2-my-unique-bucket-name",  # specify a unique bucket name
      versioned=True,  # enable versioning for the bucket
      removal_policy=cdk.RemovalPolicy.DESTROY,
      encryption=s3.BucketEncryption.S3_MANAGED  # use S3-managed encryption
    )

    bucket = s3.Bucket(self, "test3-MyBucket",
      bucket_name="test3-my-unique-bucket-name",  # specify a unique bucket name
      versioned=True,  # enable versioning for the bucket
      removal_policy=cdk.RemovalPolicy.DESTROY,
      encryption=s3.BucketEncryption.S3_MANAGED  # use S3-managed encryption
    )


app = cdk.App()
AkelloStack(app, "TestDynmaoDBStack", env=cdk.Environment(
  account=os.getenv('CDK_DEFAULT_ACCOUNT'),
  region=os.getenv('CDK_DEFAULT_REGION')))

app.synth()
