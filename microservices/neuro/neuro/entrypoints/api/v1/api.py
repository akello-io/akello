from fastapi import APIRouter

from .endpoints import vision
from .endpoints import registery_microservice

router = APIRouter()
router.include_router(vision.router, prefix="/vision", tags=["Neuro"])
router.include_router(registery_microservice.router, prefix="/admin", tags=["Neuro"])