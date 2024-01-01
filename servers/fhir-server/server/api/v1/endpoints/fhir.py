from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def create_fhir_resource():
    pass

@router.get("/{resource_type}/{identifier}")
async def get_fhir_resource():
    pass