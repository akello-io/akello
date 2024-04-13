from akello.services import BaseService
from akello.db.models_v2.organization import Organization

class OrganizationService(BaseService):

    def __init__(self):
        organization = Organization()
        organization.get()

    # ORGANIZATION RELATED METHODS
    def create(self):
        pass

    def get(self):
        pass

    # USER RELATED METHODS
    def add_user(self):
        pass

    def disable_user(self):
        pass

    def list_users(self):
        pass

    # REGISTRY RELATED METHODS
    def create_registry(self):
        pass

    def list_registries(self):
        pass

    def get_registry(self):
        pass

    def delete_registry(self):
        pass

    def update_payment_info(self):
        pass
