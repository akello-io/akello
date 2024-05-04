import logging

from fastapi import APIRouter

from mbc.adapters import dynamodb_unit_of_work
from mbc.adapters import query_service
from mbc.domain.command_handlers.registry_management_handlers.create_registry_command_handler import \
    handle_create_registry_command
from mbc.domain.command_handlers.registry_management_handlers.get_registry_command_handler import \
    handle_get_registry_command
from mbc.domain.command_handlers.registry_management_handlers.update_registry_command_handlers import \
    handle_update_registry_command
from mbc.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from mbc.domain.commands.registry_management.get_registry_command import GetRegistryCommand
from mbc.domain.commands.registry_management.update_registry_command import UpdateRegistryCommand
from mbc.entrypoints.api import config
from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry
from mbc.entrypoints.api.v1.models.update_registry import UpdateRegistry

logger = logging.getLogger('mangum')

router = APIRouter()
app_config = config.AppConfig(**config.config)

from infra.dynamodb import dynamodb as dynamodb_client

unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)

@router.get("/{registry_id}")
async def get(registry_id: str):
    command = GetRegistryCommand(registry_id=registry_id)
    registry = handle_get_registry_command(
        command=command,
        patient_query_service=query_service
    )
    return registry


@router.post("/")
async def create(registry: CreateRegistry):
    command = CreateRegistryCommand(
        name=registry.name,
        description=registry.description
    )
    handle_create_registry_command(
        command=command,
        unit_of_work=unit_of_work)


@router.put("/{registry_id}")
async def update(update_registry: UpdateRegistry, registry_id: str):
    command = UpdateRegistryCommand(
        registry_id=registry_id,
        name=update_registry.name,
        description=update_registry.description,
    )
    handle_update_registry_command(
        command=command,
        unit_of_work=unit_of_work
    )
