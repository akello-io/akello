import os, json
from akello.secrets import get_secret
from dotenv import load_dotenv

load_dotenv()


def set_aws():
    # For AWS environments we want to use secrets configured in AWS Secrets Manager
    secrets = get_secret()
    setenvars(secrets)


if not os.getenv('AKELLO_COGNITO_URL') and not os.getenv('AKELLO_UNIT_TEST'):
    set_aws()
