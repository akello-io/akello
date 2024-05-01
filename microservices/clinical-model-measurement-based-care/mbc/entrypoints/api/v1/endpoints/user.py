import logging

from fastapi import APIRouter

from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService
from mbc.domain.command_handlers.registry_management_handlers.get_user_from_registry_command_handler import \
    handle_get_user_from_registry_command
from mbc.domain.commands.registry_management.get_user_from_registry_command import GetUserFromRegistryCommand

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{user_id}")
async def get_registry_user(registry_id: str, user_id: str):
    query_service = DynamoDBRegistryQueryService()
    command = GetUserFromRegistryCommand(
        registry_id=registry_id,
        user_id=user_id
    )
    return handle_get_user_from_registry_command(command, query_service)
