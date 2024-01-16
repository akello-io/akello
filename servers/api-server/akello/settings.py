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
    setenvars(os.environ)

def set_aws():
    secrets = get_secret()
    setenvars(secrets)

# use os.environ to force an exception if it doesn't exist
if not os.getenv('AKELLO_COGNITO_LOCAL'):
    set_aws()
else:
    set_local()