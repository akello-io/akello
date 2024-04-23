import aws_cdk as cdk
from aws_cdk import (
    # Duration,
    Stack,
    aws_apigateway as apigateway,
    aws_dynamodb as dynamodb
)

from constructs import Construct
from aws_cdk import (
    aws_lambda as _lambda,
    aws_logs as logs
)

class CdkStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Define the Lambda function
        user_fn = _lambda.DockerImageFunction(
            scope=self,
            architecture=_lambda.Architecture.ARM_64,
            timeout=cdk.Duration.seconds(15),
            id='test-lambda',
            function_name='test-lambda',
            code=_lambda.DockerImageCode.from_image_asset(
                directory='microservices/user',
                file='Dockerfile.aws.lambda'
            )
        )

        # Define the API Gateway resource
        api = apigateway.LambdaRestApi(
            self,
            "user-service",
            handler = user_fn,
            proxy = False,
        )

        # Define the '/hello' resource with a GET method
        user_resource = api.root.add_resource("User")
        user_resource.add_method("GET")


        # Define the DynamoDB table
        user_table = dynamodb.TableV2(
            self,
            "User",
            table_name="User",
            partition_key=dynamodb.Attribute(name="id", type=dynamodb.AttributeType.STRING)
        )
