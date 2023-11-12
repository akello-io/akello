import os, json
from akello.secrets import get_secret


with open('../configs.json') as config_json:
    configs = json.load(config_json)


def getkey(keystore, key):
    try:
        return keystore[key]
    except KeyError:
        return None

def setenvars(keystore):
    for config in configs['environment_variables'].keys():
        configs['environment_variables'][config]['value'] = getkey(keystore, config)

def set_local():
    setenvars(os.environ)

def set_aws():
    secrets = get_secret()
    setenvars(secrets)


if os.getenv('AKELLO_ENV') not in ['LOCAL', 'TEST']:
    set_aws()
else:
    set_local()