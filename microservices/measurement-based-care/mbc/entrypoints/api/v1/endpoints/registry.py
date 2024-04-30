import logging

from fastapi import APIRouter

from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry
from mbc.entrypoints.api.v1.models.refer_patient import ReferPatient
from mbc.domain.commands.refer_patient_command import ReferPatientCommand
from mbc.domain.command_handlers.refer_patient_command_handler import handle_refer_patient_command
from mbc.domain.model.patient import Patient
from mbc.domain.model.registry import Registry
from mbc.domain.model.user import User
from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService

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
async def refer_patient(referral: ReferPatient):
    patient = Patient(
        registry_id='registry-id',
        user_id='user-id',
        created_at=3
    )
    user = User(
        registry_id='test',
        user_id='test',
        role='test',
        created_at=3,
        is_enabled=True,
    )

    registry = Registry(
        id='test',
        name='test',
        description='test',
        workflow={},
        created_at=3
    )
    handle_refer_patient_command(ReferPatientCommand(patient, user, registry), DynamoDBPatientQueryService())
    return None


@router.put("/{registry_id}")
async def update_registry(payload: dict):
    return None
