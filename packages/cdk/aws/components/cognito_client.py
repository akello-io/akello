from aws_cdk import (    
    aws_cognito as cognito
)

from constructs import Construct

class CognitoClient(Construct):

    def __init__(            
            self, scope: Construct, id_: str, *, user_pool: any, name: str
            ) -> None:
        super().__init__(scope, id_)
        
        self.client = user_pool.add_client(name,
            auth_flows=cognito.AuthFlow(
                user_password=True,
                user_srp=True
            )
        )
