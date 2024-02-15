import os, json
import aws_cdk as cdk
from aws_cdk import (    
    Stack,
    aws_cognito as cognito,
    aws_apigateway as apigateway,
    CfnOutput
)

from constructs import Construct

class ApiGateway(Construct):
    
    def __init__(            
            self, scope: Construct, id_: str, *, name: str, fn_lambda: any
            ) -> None:
        super().__init__(scope, id_)

        # apigateway.SpecRestApi(self, name,
        #    api_definition=apigateway.ApiDefinition.from_asset("./openapi.json")            
        #)    

        api = apigateway.LambdaRestApi(self, name,
            handler=fn_lambda
        )
        api.apply_removal_policy(cdk.RemovalPolicy.DESTROY)        

        deployment = apigateway.Deployment(self, "Deployment", api=api)

        
        
        

