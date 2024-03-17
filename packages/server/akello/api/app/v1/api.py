from fastapi import APIRouter
from .endpoints import registry
from .endpoints import user
from .endpoints import reports


router = APIRouter()
router.include_router(registry.router, prefix="/registry", tags=["Registry"])
router.include_router(user.router, prefix="/user", tags=["User"])
router.include_router(reports.router, prefix="/reports", tags=["Reports"])

