from fastapi import APIRouter

from .endpoints import policy

router = APIRouter()
router.include_router(policy.router, prefix="/policy", tags=["Policy"])