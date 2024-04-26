from fastapi import APIRouter

from .endpoints import registry
from .endpoints import patient
from .endpoints import measurement

router = APIRouter()
router.include_router(registry.router, prefix="/registry", tags=["Registry"])
router.include_router(patient.router, prefix="/patient", tags=["Patient"])
router.include_router(measurement.router, prefix="/measurement", tags=["Measurement"])