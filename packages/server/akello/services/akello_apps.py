import logging
from akello.db.models import AkelloApp, RegistryModel
import yaml
from akello.services import BaseService
from akello.services.registry import RegistryService

logger = logging.getLogger('mangum')


class AkelloAppsService(BaseService):

    @staticmethod
    def get_app_configs(registry_id: str):
        registry = RegistryService.get_registry(registry_id)
        registry = RegistryModel(**registry)
        with open('akello/app_configs.yaml') as f:
            try:
                akello_app_configs = yaml.safe_load(f)

                for i in range(len(akello_app_configs)):
                    for registry_app in registry.akello_apps:
                        if akello_app_configs[i]['id'] == registry_app.id:
                            akello_app_configs[i] = registry_app

                return akello_app_configs
            except yaml.YAMLError as exc:
                print(exc)

    @staticmethod
    def save_akello_app(registry_id: str, akello_app: AkelloApp):
        registry = RegistryService.get_registry(registry_id)
        registry = RegistryModel(**registry)

        if len(registry.akello_apps) == 0:
            RegistryService.update_registry_akello_apps(registry_id, [akello_app.dict()])
        else:
            for i in range(len(registry.akello_apps)):
                if registry.akello_apps[i].id == akello_app.id:
                    registry.akello_apps[i] = akello_app.dict()
            RegistryService.update_registry_akello_apps(registry_id, registry.akello_apps)
