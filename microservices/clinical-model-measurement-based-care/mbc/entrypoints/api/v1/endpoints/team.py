import logging

from fastapi import APIRouter

logger = logging.getLogger('mangum')
router = APIRouter()


@router.post("/")
async def create_team(registry_id: str):
    pass