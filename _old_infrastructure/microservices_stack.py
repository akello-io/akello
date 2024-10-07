import aws_cdk as cdk
from aws_cdk import (
    # Duration,
    Stack,
    aws_dynamodb as dynamodb,
    # aws_sqs as sqs,
    aws_lambda as _lambda,
    aws_apigateway as apigateway,
    aws_iam as iam

)
from constructs import Construct

from microservices.user.infra.cdk.cdk_stack import CdkStack as UserCdkStack
from infrastructure.database_stack import DatabaseStack

class MicroservicesStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        akello_table = dynamodb.TableV2(
            self,
            "akello-core",
            table_name="akello-core",
            partition_key=dynamodb.Attribute(name="partition_key", type=dynamodb.AttributeType.STRING),
            sort_key=dynamodb.Attribute(name="sort_key", type=dynamodb.AttributeType.STRING),
            removal_policy=cdk.RemovalPolicy.DESTROY
        )

        akello_measurements_table = dynamodb.TableV2(
            self,
            "akello-measurements",
            table_name="akello-measurements",
            partition_key=dynamodb.Attribute(name="partition_key", type=dynamodb.AttributeType.STRING),
            sort_key=dynamodb.Attribute(name="timestamp", type=dynamodb.AttributeType.NUMBER),
            removal_policy=cdk.RemovalPolicy.DESTROY
        )

        ####

        # Define the Lambda function
        user_fn = _lambda.DockerImageFunction(
            scope=self,
            architecture=_lambda.Architecture.ARM_64,
            timeout=cdk.Duration.seconds(15),
            id='fn-user-microservice',
            function_name='fn-user-microservice',
            code=_lambda.DockerImageCode.from_image_asset(
                directory='./microservices/user',
                file='Dockerfile.aws.lambda'
            ),
        )


        ###

        # Define the API Gateway resource
        api = apigateway.LambdaRestApi(
            self,
            "user-service-api",
            handler = user_fn,
            proxy = False,
        )

        # Define the '/hello' resource with a GET method
        user_resource = api.root.add_resource("{id}")
        user_resource.add_method("GET")

        user_resource = api.root.add_resource("user")
        user_resource.add_method("POST")


        ##

        akello_table.grant_read_write_data(user_fn)