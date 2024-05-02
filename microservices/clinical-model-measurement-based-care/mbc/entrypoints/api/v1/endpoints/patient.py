import logging

from fastapi import APIRouter

from mbc.adapters import query_service
from mbc.domain.command_handlers.registry_management_handlers.add_user_to_registry_command_handler import \
    handle_add_user_to_registry_command
from mbc.domain.commands.registry_management.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.entrypoints.api.v1.models.refer_patient import ReferPatient

logger = logging.getLogger('mangum')
router = APIRouter()

@router.post("/refer")
async def refer_patient(registry_id: str, referral: ReferPatient):
    command = AddUserToRegistryCommand(
        registry_id=registry_id,
        user_id=referral.user_id,
        role='patient'
    )
    handle_add_user_to_registry_command(command, query_service)


@router.get("/{patient_id}")
async def get_patient(patient_id: str):
    return None


@router.put("/{patient_id}/flag/{flag}")
async def flag_patient(patient_id: str, flag: str):
    return None


@router.put("/{patient_id}/state/{state}")
async def set_state(patient_id: str, state: str):
    return None


@router.put("/{patient_id}/billable/{event}")
async def billable_event(patient_id: str, event: str):
    return None
