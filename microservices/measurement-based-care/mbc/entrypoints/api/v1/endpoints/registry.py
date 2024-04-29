import logging

from fastapi import APIRouter

from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry
from mbc.entrypoints.api.v1.models.refer_patient import ReferPatient

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{registry_id}")
async def get_registry(registry_id: str):
    return None


@router.post("/{registry_id}")
async def create_registry(registry: CreateRegistry):
    return None


@router.post("/{registry_id}/patient")
async def refer_patient(patient: ReferPatient):
    return None


@router.put("/{registry_id}")
async def update_registry(payload: dict):
    return None
