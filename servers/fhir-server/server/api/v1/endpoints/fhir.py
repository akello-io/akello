from fastapi import APIRouter
from fastapi import Request
from flatten_json import flatten
from server.services.fhir import FHIRService

router = APIRouter()

@router.post("/")
async def create_fhir_resource(request: Request):    
    fhir_resource = await request.json()
    
    for patient in fhir_resource['patients']:
        for resource_entry in patient['bundle']['entry']:
            #TODO: validate the resource        
            fhir_resource = resource_entry['resource']            
            flat_fhir_resource = flatten(fhir_resource)
            print('resource flattened: %s' % flat_fhir_resource['resourceType'])
            # print(flat_fhir_resource.keys())
            import pdb;pdb.set_trace()

    # Create resource

    return {"message": "Resource Created"}

@router.get("/{resource_type}/{identifier}")
async def get_fhir_resource():
    pass