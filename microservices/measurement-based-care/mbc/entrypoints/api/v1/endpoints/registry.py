import logging

from fastapi import APIRouter

from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry
from mbc.entrypoints.api.v1.models.refer_patient import ReferPatient
from mbc.domain.command_handlers.registry_management_handlers.add_user_to_registry_command_handler import handle_add_user_to_registry_command
from mbc.domain.commands.registry_management.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService
from mbc.domain.commands.registry_management.get_user_from_registry_command import GetUserFromRegistryCommand
from mbc.domain.command_handlers.registry_management_handlers.get_user_from_registry_command_handler import handle_get_user_from_registry_command
from mbc.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from mbc.domain.command_handlers.registry_management_handlers.create_registry_command_handler import handle_create_registry_command

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{registry_id}")
async def get_registry(registry_id: str):
    print(f"get_registry {registry_id}")
    return {'registry_id': registry_id}


@router.post("/{registry_id}")
async def create_registry(registry: CreateRegistry):
    query_service = DynamoDBRegistryQueryService()
    command = CreateRegistryCommand(
        name=registry.name,
        description=registry.description
    )
    registry = handle_create_registry_command(command, query_service)
    return registry


@router.post("/{registry_id}/patient")
async def refer_patient(registry_id: str, referral: ReferPatient):
    query_service = DynamoDBRegistryQueryService()
    command = AddUserToRegistryCommand(
        registry_id=registry_id,
        user_id=referral.user_id,
        role='patient'
    )
    handle_add_user_to_registry_command(command, query_service)


@router.get("/{registry_id}/users/{user_id}")
async def get_registry_users(registry_id: str, user_id: str):
    query_service = DynamoDBRegistryQueryService()
    command = GetUserFromRegistryCommand(
        registry_id=registry_id,
        user_id=user_id
    )
    return handle_get_user_from_registry_command(command, query_service)


@router.put("/{registry_id}")
async def update_registry(payload: dict):
    return None
