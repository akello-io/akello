from fastapi import APIRouter

from account.adapters import dynamodb_unit_of_work
from account.domain.command_handlers.user.get_user_command_handler import handle_get_registry_command
from account.domain.commands.user.get_user_command import GetUserCommand
from account.entrypoints.api.config import config
from account.adapters.dynamodb_initiation import dynamodb as dynamodb_client

# TODO : no logger here

router = APIRouter()
app_config = config.AppConfig(**config.config)
unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)


@router.get("/{user_id}")
async def get(user_id: str):
    command = GetUserCommand(registry_id=user_id)
    registry = handle_get_registry_command(
        command=command,
        unit_of_work=unit_of_work
    )
    return registry
