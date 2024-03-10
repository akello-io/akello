import aws_cdk as cdk
from aws_cdk import (        
    aws_apigateway as apigateway    
)

from constructs import Construct

class ApiGateway(Construct):
    
    def __init__(            
            self, scope: Construct, id_: str, *, name: str, fn_lambda: any
            ) -> None:
        super().__init__(scope, id_)

        self.api = apigateway.LambdaRestApi(self, name,
            handler=fn_lambda
        )
        self.api.apply_removal_policy(cdk.RemovalPolicy.DESTROY)        

        apigateway.Deployment(self, "Deployment", api=self.api)
