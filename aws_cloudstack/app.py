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
    aws_ecr as ecr
)
from constructs import Construct


class AkelloStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        self.dynamo_db()
        self.cognito_lambda_api_gateway()

    def cognito_lambda_api_gateway(self):
        user_pool = aws_cognito.UserPool(
            self,
            'test-user-pool',
            user_pool_name='test-user-pool',
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
        auth = aws_apigateway.CognitoUserPoolsAuthorizer(
            self,
            'test-user-pool-authorizer',
            cognito_user_pools=[user_pool]
        )
        custom_container_ecr_repo = ecr.Repository.from_repository_name(
            self,
            'test-ecr-v1',
            repository_name='test-ecr-v1'
        )
        lambda_fn = aws_lambda.Function(
            self, "test-lambda",
            code=aws_lambda.Code.from_ecr_image(
                repository=custom_container_ecr_repo,
                tag_or_digest='latest'
            ),
            handler=aws_lambda.Handler.FROM_IMAGE,
            runtime=aws_lambda.Runtime.FROM_IMAGE,
            function_name="test-lambda-fn",
            description="Lambda function defined in the custom container",
            timeout=cdk.Duration.minutes(5),
            memory_size=5120
        )
        helloworld_lambda_rest_api = aws_apigateway.LambdaRestApi(
            self,
            'test-lambda-rest-api',
            rest_api_name="test-lambda-rest-api",
            handler=lambda_fn,
            proxy=False,
            deploy=True,
            deploy_options=aws_apigateway.StageOptions(stage_name="v1"),
            endpoint_export_name='test-api-gateway-rest-api'
        )

        hello = helloworld_lambda_rest_api.root.add_resource("hello")
        hello.add_method(
            'GET',
            aws_apigateway.LambdaIntegration(
                handler=lambda_fn
            ),
            authorization_type=aws_apigateway.AuthorizationType.COGNITO,
            authorizer=auth
        )
        cdk.CfnOutput(self, 'UserPoolId', value=user_pool.user_pool_id)

    def dynamo_db(self):
        ddb_table = aws_dynamodb.Table(
            self,
            "test-dynamodb-table",
            table_name='test-dynamodb-table',
            removal_policy=cdk.RemovalPolicy.DESTROY,
            partition_key=aws_dynamodb.Attribute(
                name="partition_key",
                type=aws_dynamodb.AttributeType.STRING),
            time_to_live_attribute="ttl",
            billing_mode=aws_dynamodb.BillingMode.PROVISIONED,
            read_capacity=15,
            write_capacity=5
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


class ECRStack(Stack):

    def __init__(
            self,
            scope: Construct,
            construct_id: str,
            ecr_repo_name: str,
            **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)
        self.ecr_repo_name = ecr_repo_name
        self.create_and_deploy_to_ecr()

    def create_and_deploy_to_ecr(self):
        repository = ecr.Repository(
            self,
            self.ecr_repo_name,
            repository_name=self.ecr_repo_name,
            removal_policy=cdk.RemovalPolicy.DESTROY
        )


app = cdk.App()
ECRStack(app, "ECRStack", 'test-ecr-v1', env=cdk.Environment(
    account=os.getenv('CDK_DEFAULT_ACCOUNT'),
    region=os.getenv('CDK_DEFAULT_REGION')))
AkelloStack(app, "TestDynmaoDBStack", env=cdk.Environment(
    account=os.getenv('CDK_DEFAULT_ACCOUNT'),
    region=os.getenv('CDK_DEFAULT_REGION')))
app.synth()
