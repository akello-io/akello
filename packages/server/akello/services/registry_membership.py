from akello.services import BaseService


class RegistryMembershipService(BaseService):

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    # TODO: required roles: ['user must have role in the registry']
    def add_user_to_registry(self, registry, user, role):
        pass

    # TODO: We need decorator for permissions
    # TODO: We need to add logging
    def remove_user_from_registry(self, registry, user):
        pass
