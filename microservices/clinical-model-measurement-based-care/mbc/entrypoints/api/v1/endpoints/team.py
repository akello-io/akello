import logging

from fastapi import APIRouter

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{registry_id}")
async def get_team(registry_id: str):
    return None


@router.post("/{registry_id}")
async def invite_team_member(registry_id: str, member: dict):
    return None


@router.post("/{registry_id}/patient")
async def remove_team_member(registry_id: str, member: dict):
    return None
