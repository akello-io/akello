import logging

from fastapi import APIRouter

logger = logging.getLogger('mangum')
router = APIRouter()


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
