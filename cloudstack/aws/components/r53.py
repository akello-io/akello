from aws_cdk import (
    aws_route53 as route53
)

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