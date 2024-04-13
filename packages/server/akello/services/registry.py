from akello.db.models_v2.registry import Registry
from akello.services import BaseService


class RegistryService(BaseService):
    registry: Registry = None

    def __init__(self, registry_id: str):
        self.registry = Registry(registry_id)

    def get(self) -> Registry:
        return self.registry.get()

    def put(self) -> Registry:
        return self.registry.put()

    def create(self, patient: Registry) -> Registry:
        return self.registry.create(patient)