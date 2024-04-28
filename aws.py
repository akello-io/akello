#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infrastructure.microservices_stack import MicroservicesStack
from infrastructure.database_stack import DatabaseStack


app = cdk.App()
MicroservicesStack(app, "MicroservicesStack")

DatabaseStack(app, "DatabaseStack")

app.synth()
