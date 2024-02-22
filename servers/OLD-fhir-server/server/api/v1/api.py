from fastapi import APIRouter
from .endpoints import fhir


router = APIRouter()
router.include_router(fhir.router, prefix="/fhir", tags=["FHIR"])

