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
  aws_s3 as s3,
  aws_cloudfront as cf
)
from constructs import Construct



"""
STATIC_SITE_APP=aa.a.com
STATIC_SITE_DOCS=aa.a.com
STATIC_SITE_STORYBOOK=aa.a.com
STATIC_SITE_WWW=aa.a.com    
DYNAMO_DB_TABLE=xx
COGNITO_POOL_NAME=xx
COGNITO_POOL_CLIENT_NAME=xx
"""

class AkelloStack(Stack):

  def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
    super().__init__(scope, construct_id, **kwargs)
    self.dynamo_db()
    self.static_site_web('akello-test.akello.io')


  def cognito_lambda_api_gateway(self):
      user_pool = aws_cognito.UserPool(self, 'UserPool',
           user_pool_name='Test-UserPoolForApiGateway',
           removal_policy=cdk.RemovalPolicy.DESTROY,
           self_sign_up_enabled=True,
           sign_in_aliases={'email': True},
           auto_verify={'email': True},
           password_policy={
               'min_length': 8,
               'require_lowercase': False,
               'require_digits': False,
               'require_uppercase': False,
               'require_symbols': False,
           },
           account_recovery=aws_cognito.AccountRecovery.EMAIL_ONLY
      )

      user_pool_client = aws_cognito.UserPoolClient(self, 'Test-UserPoolClient',
        user_pool=user_pool,
        auth_flows={
            'admin_user_password': True,
            'user_password': True,
            'custom': True,
            'user_srp': True
        },
        supported_identity_providers=[
            aws_cognito.UserPoolClientIdentityProvider.COGNITO]
      )

      auth = aws_apigateway.CognitoUserPoolsAuthorizer(self, 'AuthorizerForHelloWorldApi',
        cognito_user_pools=[user_pool]
      )

      helloworld_lambda_fn = aws_lambda.Function(self, 'HelloWorldLambdaFn',
         runtime=aws_lambda.Runtime.PYTHON_3_9,
         function_name="HelloWorldApi",
         handler="helloworld.lambda_handler",
         description='Function that returns 200 with "Hello world!"',
         code=aws_lambda.Code.from_asset(
             os.path.join(os.path.dirname(__file__), 'src/main/python')),
         timeout=cdk.Duration.minutes(5)
      )

      helloworld_lambda_rest_api = aws_apigateway.LambdaRestApi(self, 'HelloWorldLambdaRestApi',
        rest_api_name="helloworld-api",
        handler=helloworld_lambda_fn,
        proxy=False,
        deploy=True,
        deploy_options=aws_apigateway.StageOptions(
            stage_name="v1"),
        endpoint_export_name='ApiGatewayRestApiEndpoint'
      )

      hello = helloworld_lambda_rest_api.root.add_resource("hello")
      hello.add_method('GET',
       aws_apigateway.LambdaIntegration(
           handler=helloworld_lambda_fn
       ),
       authorization_type=aws_apigateway.AuthorizationType.COGNITO,
       authorizer=auth
      )

      cdk.CfnOutput(self, 'UserPoolId', value=user_pool.user_pool_id)
      cdk.CfnOutput(self, 'UserPoolClientId', value=user_pool_client.user_pool_client_id)

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

  def static_site_web(self, static_site_name):
    bucket = s3.Bucket(self, static_site_name,
     bucket_name=static_site_name,  # specify a unique bucket name
     versioned=True,  # enable versioning for the bucket
     access_control=s3.BucketAccessControl.PRIVATE,
     removal_policy=cdk.RemovalPolicy.DESTROY,
     encryption=s3.BucketEncryption.S3_MANAGED  # use S3-managed encryption
    )

    distribution = cf.CloudFrontWebDistribution(self, "AnAmazingWebsiteProbably",
        origin_configs=[cf.SourceConfiguration(
            s3_origin_source=cf.S3OriginConfig(
                s3_bucket_source=bucket),
            behaviors=[cf.Behavior(
                is_default_behavior=True)]
        )]
    )


app = cdk.App()
AkelloStack(app, "TestDynmaoDBStack", env=cdk.Environment(
  account=os.getenv('CDK_DEFAULT_ACCOUNT'),
  region=os.getenv('CDK_DEFAULT_REGION')))
app.synth()
