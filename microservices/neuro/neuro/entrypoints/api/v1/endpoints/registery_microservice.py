from neuro.adapters.cognito_adapter import CognitoAdapter
from neuro.domain.command_handlers.register_microservice_handler import RegisterMicroserviceHandler
from neuro.domain.commands.register_microservice_command import RegisterMicroserviceCommand

from fastapi import APIRouter, Depends
from fastapi_cognito import CognitoToken

from neuro.entrypoints.api import config
from neuro.entrypoints.api.config import cognito_us


router = APIRouter()
app_config = config.AppConfig(**config.config)


# Instantiate the adapter and handler
user_pool_id = "your-user-pool-id"
auth_adapter = CognitoAdapter(user_pool_id)
register_handler = RegisterMicroserviceHandler(auth_adapter)

@router.post('/register')
def register_microservice(request: dict):
    data = request.json
    command = RegisterMicroserviceCommand(app_client_name=data['app_client_name'])
    result = register_handler.handle(command)
    return result