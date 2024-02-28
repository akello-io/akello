import json
import logging

from fastapi import APIRouter

from akello.db.models import PatientRegistry, EventLog, RegistryModel, Measurement
from akello.services.registry import RegistryService
from akello.plugins.metriport.plugin import MetaData, OperationEnum
from enum import Enum, IntEnum
    
logger = logging.getLogger('mangum')
router = APIRouter()

class RequestTypeEnum(str, Enum):
    document_download = 'medical.document-download'
    banana = 'medical.document-conversion'
    consolidated_data = 'medical.consolidated-data' 
    document_bulk_downoad_urls = 'medical.document-bulk-download-urls'
    ping = 'ping'

def custom_score(metadata: MetaData):
    print('start custom score function')        
    registry = RegistryModel(**RegistryService.get_registry(metadata.registry_id))
    patient = RegistryService.get_patient(metadata.registry_id, metadata.patient_mrn)            
    patient = PatientRegistry(**patient)            
    
    scores = []    
    for measurement in registry.questionnaires:        
        if measurement.type == 'fhir-object-query':
            print("running fhir-object-query")
            scores.append({
                'score_name': measurement.name,
                'score_value': 10
            })        
    
    patient.treatment_logs[-1].scores += scores
    RegistryService.update_patient(patient)        

@router.post("/")
async def metriport_webhook(payload: dict):
    print("received metriport webhook call")
    print("-----------------------------------")
    print(json.dumps(payload, indent = 4))    
    print("-----------------------------------")

    request_type = RequestTypeEnum(payload['meta']['type'])
    
    if request_type == RequestTypeEnum.consolidated_data:
        print('consolidated request')
        metadata = MetaData(**payload['meta']['data'])
                
        if metadata.operation == OperationEnum.score:
            custom_score(metadata)
