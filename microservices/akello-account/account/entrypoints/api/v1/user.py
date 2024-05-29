from fastapi import APIRouter

from account.adapters import dynamodb_unit_of_work
from account.domain.command_handlers.user.get_user_command_handler import handle_get_user_command
from account.domain.commands.user.get_user_command import GetUserCommand
from account.entrypoints.api import config
from account.adapters.dynamodb_initiation import dynamodb as dynamodb_client

# TODO : no logger here

router = APIRouter()
app_config = config.AppConfig(**config.config)
unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)


@router.get("/{user_id}")
async def get(user_id: str):
    print(user_id)
    command = GetUserCommand(user_id=user_id)
    user = handle_get_user_command(
        command=command,
        unit_of_work=unit_of_work
    )
    return user


@router.post("/")
async def create(registry: CreateRegistry):
    command = CreateRegistryCommand(
        name=registry.name,
        description=registry.description
    )
    ret = handle_create_registry_command(
        command=command,
        unit_of_work=unit_of_work)
    return ret
