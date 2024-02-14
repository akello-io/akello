import os, json
import aws_cdk as cdk
from aws_cdk import (
    CfnTag,
    Stack,    
    aws_iam as iam,
    aws_s3 as s3,    
    aws_s3_notifications as s3n,
    aws_route53 as route53,
    aws_route53_targets as route53targets
)
from aws_cdk import aws_route53resolver as route53resolver
from aws_cdk import aws_route53_targets as route53targets


from constructs import Construct

class R53(Construct):

    def __init__(            
            self, scope: Construct, id_: str, *, zone_name: str
            ) -> None:
        super().__init__(scope, id_)

        # Create a public hosted zone for
        self.public_hosted_zone = route53.PublicHostedZone(
            self,                     
            zone_name,
            zone_name=zone_name
        )         