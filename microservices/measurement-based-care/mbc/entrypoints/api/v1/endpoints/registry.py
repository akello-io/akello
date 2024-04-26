import logging
import os

import yaml
from fastapi import APIRouter, Depends


logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{registry_id}")
async def get_registry(registry_id: str):
    return None
