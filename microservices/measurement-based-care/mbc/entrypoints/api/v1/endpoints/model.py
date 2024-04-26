import logging
import os

import yaml
from fastapi import APIRouter, Depends
from mbc.entrypoints.api.v1.models.create_registry import CreateRegistry

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{model_id}")
async def get_model(model_id: str):
    return None

@router.post("/{model_id}")
async def create_model(registry: CreateRegistry):
    return None


@router.put("/{model_id}")
async def update_model(payload: dict):
    return None