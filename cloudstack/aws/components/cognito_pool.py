import os, json
import aws_cdk as cdk
from aws_cdk import (    
    Stack,
    aws_cognito as cognito,
)

from constructs import Construct

class CognitoPool(Construct):

    def __init__(            
            self, scope: Construct, id_: str, *, name: str, user_pool_name: str
            ) -> None:
        super().__init__(scope, id_)        

        self.user_pool = cognito.UserPool(self, name,
            user_pool_name=user_pool_name,
            sign_in_case_sensitive=False,
            removal_policy=cdk.RemovalPolicy.DESTROY, 
            self_sign_up_enabled=True,
            auto_verify=cognito.AutoVerifiedAttrs(email=True)
        )
