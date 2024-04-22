import aws_cdk as cdk
from aws_cdk import (
    # Duration,
    Stack,
    aws_apigateway as apigateway,
)
from constructs import Construct
from aws_cdk import (
    aws_lambda as _lambda,
    aws_logs as logs
)

class CdkStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        test_fn = _lambda.DockerImageFunction(
            scope=self,
            architecture=_lambda.Architecture.ARM_64,
            timeout=cdk.Duration.seconds(15),
            id='test-lambda',
            # Function name on AWS
            function_name='test-lambda',
            # Use aws_cdk.aws_lambda.DockerImageCode.from_image_asset to build
            # a docker image on deployment
            code=_lambda.DockerImageCode.from_image_asset(
                # Directory relative to where you execute cdk deploy
                # contains a Dockerfile with build instructions
                directory='../user',
                file='Dockerfile.aws.lambda'
            )
        )

        # Define the API Gateway resource
        api = apigateway.LambdaRestApi(
            self,
            "HelloWorldApi",
            handler = test_fn,
            proxy = False,
        )

        # Define the '/hello' resource with a GET method
        hello_resource = api.root.add_resource("hello")
        hello_resource.add_method("GET")
