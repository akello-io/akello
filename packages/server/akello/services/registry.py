from akello.db.models_v2.registry import Registry
from akello.db.models_v2.user import User, UserRegistry
from akello.db.models_v2.measurement import Measurement
from akello.services import BaseService


class RegistryService(BaseService):
    registry: Registry = None

    def __init__(self, user: User, registry_id, name: str, logo: str):

        if registry_id is None:
            self.registry = Registry(
                name=name,
                logo=logo
            )
        else:
            self.registry = self.get_by_registry_id(user, registry_id)

    def get_by_registry_id(self, user: User, registry_id: str) -> Registry:
        user_registry = UserRegistry(user=user, registry=self.registry).get()
        if not user_registry:
            raise Exception("User not registered to this registry")

        return Registry.get_by_key(partition_key=registry_id, sort_key='meta')

    def get(self, user: User) -> Registry:
        user_registry = UserRegistry(user=user, registry=self.registry).get()
        if not user_registry:
            raise Exception("User not registered to this registry")

        return self.registry.get()

    def put(self, user: User) -> Registry:
        user_registry = UserRegistry(user=user, registry=self.registry).get()
        if not user_registry:
            raise Exception("User not registered to this registry")

        return self.registry.put()

    def list_patients_with_consent(self, registry_id: str):
        pass

    # TREATMENT RELATED METHODS
    def add_patient_measurement(self, patient_id: str, measurement: Measurement, registry: Registry):
        pass

    def add_self_measurement(self, measurement: Measurement, registry: Registry):
        # self reported measurement
        pass
