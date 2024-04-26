import logging
import os

import yaml
from fastapi import APIRouter, Depends

logger = logging.getLogger('mangum')
router = APIRouter()


@router.post("/")
async def record_measurement(payload: dict):
    return None
