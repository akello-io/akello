import logging

from fastapi import APIRouter

from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry
from mbc.entrypoints.api.v1.models.refer_patient import ReferPatient
from mbc.domain.command_handlers.add_user_to_registry_command_handler import handle_add_user_to_registry_command
from mbc.domain.commands.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{registry_id}")
async def get_registry(registry_id: str):
    print(f"get_registry {registry_id}")
    return {'registry_id': registry_id}


@router.post("/{registry_id}")
async def create_registry(registry: CreateRegistry):
    return None


@router.post("/{registry_id}/patient")
async def refer_patient(registry_id: str, referral: ReferPatient):
    query_service = DynamoDBRegistryQueryService()
    command = AddUserToRegistryCommand(
        registry_id=registry_id,
        user_id=referral.user_id,
        role='patient'
    )
    handle_add_user_to_registry_command(command, query_service)
    pass


@router.put("/{registry_id}")
async def update_registry(payload: dict):
    return None
