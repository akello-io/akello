import os, json
from akello.secrets import get_secret

with open('../../configs.json') as config_json:
    configs = json.load(config_json)


def getkey(keystore, key):
    try:
        return keystore[key]
    except KeyError:
        return None


def setenvars(keystore):
    for config in configs.keys():
        configs[config]['value'] = getkey(keystore, config)


def set_local():
    # For local environments we want to use our local settings
    setenvars(os.environ)


def set_aws():
    # For AWS environments we want to use secrets configured in AWS Secrets Manager
    secrets = get_secret()
    setenvars(secrets)


if os.getenv('AKELLO_COGNITO_LOCAL') == 'TRUE' or os.getenv('AKELLO_UNIT_TEST') == 'TRUE':
    set_local()
else:
    set_aws()

print(configs)
