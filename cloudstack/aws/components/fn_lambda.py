import aws_cdk as cdk
from constructs import Construct
from aws_cdk import (    
    aws_lambda as _lambda,
    aws_logs as logs
)


class fn_Lambda(Construct):
    def __init__(
        self, scope: Construct, id_: str, *, lambda_name: str, path:str, dockerfile: str, lambda_env: dict, role_policy: dict = None
    ):
        super().__init__(scope, id_)

        self.fn_lambda = _lambda.DockerImageFunction(
            scope=self,
            architecture=_lambda.Architecture.ARM_64,
            timeout=cdk.Duration.seconds(15),
            id=lambda_name,
            # Function name on AWS
            function_name=lambda_name,
            # Use aws_cdk.aws_lambda.DockerImageCode.from_image_asset to build
            # a docker image on deployment
            code=_lambda.DockerImageCode.from_image_asset(
                # Directory relative to where you execute cdk deploy
                # contains a Dockerfile with build instructions                
                directory=path,
                file=dockerfile
            ),
            environment=lambda_env,
            log_group=logs.LogGroup(
                scope=self,
                id=f"{lambda_name}LogGroup",
                log_group_name=f"/aws/lambda/{lambda_name}",
                removal_policy=cdk.RemovalPolicy.DESTROY
            )            
        )        

        # self.fn_lambda.log_group.add_stream(lambda_name)

        if role_policy:
            self.fn_lambda.add_to_role_policy(role_policy)
        
        

        