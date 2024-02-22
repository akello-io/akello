from fastapi import APIRouter
from .endpoints import fhir_resource


router = APIRouter()
router.include_router(fhir_resource.router, tags=["FHIR Resource"])
