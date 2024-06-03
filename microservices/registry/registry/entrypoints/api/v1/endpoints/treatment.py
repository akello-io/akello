import logging

from fastapi import APIRouter

logger = logging.getLogger('mangum')
router = APIRouter()


@router.post("/")
async def schedule_session(registry_id: str, patient_id: str, provider_id: str, date: str):
    pass


@router.get("/")
async def get_measurements(registry_id: str, patient_id: str, type: str, start_date: str=None, end_date: str=None):
    pass

@router.get("//{type}")
async def get_measurement(registry_id: str, patient_id: str, type: str, start_date: str=None, end_date: str=None):
    pass