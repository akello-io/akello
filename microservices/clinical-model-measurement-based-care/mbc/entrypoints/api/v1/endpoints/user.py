import logging

from fastapi import APIRouter

from mbc.adapters import query_service
from mbc.domain.command_handlers.registry_management_handlers.get_user_from_registry_command_handler import \
    handle_get_user_from_registry_command
from mbc.domain.commands.registry_management.get_user_from_registry_command import GetUserFromRegistryCommand

logger = logging.getLogger('mangum')
router = APIRouter()

@router.get("/{user_id}")
async def get_user(registry_id: str, user_id: str):
    command = GetUserFromRegistryCommand(
        registry_id=registry_id,
        user_id=user_id
    )
    return handle_get_user_from_registry_command(command, query_service)

@router.post("/{user_id}")
async def add_user(registry_id: str, user_id: str):
    pass
