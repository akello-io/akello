from fastapi import APIRouter

from .endpoints import model
from .endpoints import patient
from .endpoints import measurement

router = APIRouter()
router.include_router(model.router, prefix="/model", tags=["Measurement Based Care Model"])
router.include_router(patient.router, prefix="/patient", tags=["Patient"])
router.include_router(measurement.router, prefix="/measurement", tags=["Measurement"])