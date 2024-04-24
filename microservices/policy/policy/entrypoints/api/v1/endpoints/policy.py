import logging
from fastapi import APIRouter, Depends

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/")
async def get_policy():
    return None

