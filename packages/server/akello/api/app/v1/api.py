from fastapi import APIRouter
from .endpoints import registry
from .endpoints import user
from .endpoints import organization
from .endpoints import patient
from .endpoints import measurement

router = APIRouter()
router.include_router(measurement.router, prefix="/measurement", tags=["Measurement"])
router.include_router(registry.router, prefix="/registry", tags=["Registry"])
router.include_router(user.router, prefix="/user", tags=["User"])
router.include_router(organization.router, prefix="/organization", tags=["Organization"])
router.include_router(patient.router, prefix="/patient", tags=["Patient"])
