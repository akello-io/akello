from fastapi import APIRouter

from .endpoints import measurement
from .endpoints import patient
from .endpoints import registry
from .endpoints import team
from .endpoints import treatment
from .endpoints import user

router = APIRouter()
router.include_router(registry.router, prefix="/{registry_id}", tags=["Registry"])
router.include_router(patient.router, prefix="/{registry_id}/patient", tags=["Patient"])
router.include_router(team.router, prefix="/{registry_id}/team", tags=["Team"])
router.include_router(treatment.router, prefix="/{registry_id}/patient/{patient_id}/treatment", tags=["Treatment"])
router.include_router(user.router, prefix="/{registry_id}/user", tags=["User"])
router.include_router(measurement.router, prefix="/{registry_id}/patient/{patient_id}/measurement",
                      tags=["Measurement"])
