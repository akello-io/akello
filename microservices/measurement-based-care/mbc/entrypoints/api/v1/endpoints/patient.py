import logging
import os

import yaml
from fastapi import APIRouter, Depends

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{patient_id}")
async def get_patient(patient_id: str):
    return None

@router.post("/{model_id}")
async def create_patient(payload: dict):
    return None
