import os
import json
import logging
import yaml

from akello.services import BaseService

logger = logging.getLogger('mangum')

class AkelloAppsService(BaseService):

    @staticmethod    
    def get_app_configs():

        with open('akello/app_configs.yaml') as f:
            try:
                app_config = yaml.safe_load(f)
                print(app_config)
                return app_config
            except yaml.YAMLError as exc:
                print(exc)