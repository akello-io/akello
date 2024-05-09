import logging

from fastapi import APIRouter

from mbc.domain.command_handlers.registry_management_handlers.add_user_to_registry_command_handler import \
    handle_add_user_to_registry_command
from mbc.domain.commands.registry_management.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.entrypoints.api.v1.models.refer_patient import ReferPatient
from mbc.domain.model.registry import RegistryUser
from mbc.adapters import dynamodb_unit_of_work
from mbc.entrypoints.api import config
from infra.dynamodb import dynamodb as dynamodb_client


logger = logging.getLogger('mangum')
router = APIRouter()

app_config = config.AppConfig(**config.config)


unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)


@router.post("/refer")
async def refer_patient(registry_id: str, referral: ReferPatient):
    command = AddUserToRegistryCommand(
        registry_id=registry_id,
        user_id=referral.user_id,
        role='patient'
    )
    handle_add_user_to_registry_command(
        command=command,
        unit_of_work=unit_of_work)


@router.get("/{patient_id}")
async def get_patient(patient_id: str) -> RegistryUser:
    raise Exception("Not implemented")


@router.put("/{patient_id}/flag/{flag}")
async def flag_patient(patient_id: str, flag: str):
    return None


@router.put("/{patient_id}/state/{state}")
async def set_state(patient_id: str, state: str):
    return None


@router.put("/{patient_id}/billable/{event}")
async def billable_event(patient_id: str, event: str):
    return None
