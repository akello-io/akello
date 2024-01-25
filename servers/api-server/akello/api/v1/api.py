from fastapi import APIRouter
from .endpoints import registry
from .endpoints import user
from .endpoints import financial_model
from .endpoints import reports
from .endpoints import integrations


router = APIRouter()
router.include_router(registry.router, prefix="/registry", tags=["Registry"])
router.include_router(user.router, prefix="/user", tags=["User"])
router.include_router(financial_model.router, prefix="/financial-model", tags=["Financial Model"])
router.include_router(reports.router, prefix="/reports", tags=["Reports"])
router.include_router(integrations.router, prefix="/integrations", tags=["Integrations"])

