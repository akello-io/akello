from fastapi import APIRouter

from .endpoints import registry

router = APIRouter()
router.include_router(registry.router, prefix="/registry", tags=["Registry"])