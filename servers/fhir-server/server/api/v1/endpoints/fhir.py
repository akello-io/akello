from fastapi import APIRouter
from fastapi import Request
from flatten_json import flatten, unflatten
from server.services.fhir_resource import FHIRResourceService

router = APIRouter()

@router.post("/")
async def create_fhir_resource(request: Request):    
    fhir_resource = await request.json()
    
    #TODO: validate the resource

    flat_fhir_resource = flatten(fhir_resource)    
    FHIRResourceService().create_fhir_resource(flat_fhir_resource)    
    return {"message": "Resource Created"}

@router.get("/{resource_type}/{identifier}")
async def get_fhir_resource(resource_type: str, identifier: str):

    #TODO: verify access

    reource = FHIRResourceService().get_fhir_resource(resource_type, identifier)    
    return unflatten(reource)