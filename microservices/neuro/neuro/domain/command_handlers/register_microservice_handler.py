# app/domain/command_handlers/register_microservice_handler.py
from neuro.domain.ports.auth_provider_port import AuthProviderPort

class RegisterMicroserviceHandler:
    def __init__(self, auth_provider: AuthProviderPort):
        self.auth_provider = auth_provider

    def handle(self, command):
        return self.auth_provider.register_service(command.app_client_name)
