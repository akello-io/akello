import logging

from fastapi import APIRouter

from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService
from mbc.domain.command_handlers.registry_management_handlers.create_registry_command_handler import \
    handle_create_registry_command
from mbc.domain.command_handlers.registry_management_handlers.get_registry_command_handler import \
    handle_get_registry_command
from mbc.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from mbc.domain.commands.registry_management.get_registry_command import GetRegistryCommand
from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/")
async def get_registry(registry_id: str):
    query_service = DynamoDBRegistryQueryService()
    command = GetRegistryCommand(registry_id=registry_id)
    registry = handle_get_registry_command(command, query_service)
    return registry


@router.post("/")
async def create_registry(registry: CreateRegistry):
    query_service = DynamoDBRegistryQueryService()
    command = CreateRegistryCommand(
        name=registry.name,
        description=registry.description
    )
    registry = handle_create_registry_command(command, query_service)
    return registry


@router.put("/")
async def update_registry(payload: dict):
    return None
