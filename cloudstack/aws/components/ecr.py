from aws_cdk import (
    aws_ecr as ecr
)

from constructs import Construct

class ECR(Construct):

    def __init__(            
            self, scope: Construct, id_: str, *, name: str
            ) -> None:
        super().__init__(scope, id_)

        ecr.Repository(
            self, 
            id_,
            repository_name=name,
            image_scan_on_push=True
        )