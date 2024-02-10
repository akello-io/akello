from fastapi import APIRouter
from akello.services.registry import RegistryService
from akello.dynamodb.models.registry import PatientRegistry, EventLog
import uuid
import logging
import datetime 


logger = logging.getLogger('mangum')
router = APIRouter()

@router.post("/metriport/webhook")
async def metriport_webhook(payload: dict):
    print("received metriport webhook call")
    print("-----------------------------------")
    print(payload)
    print("-----------------------------------")

    if payload['meta']['type'] == 'medical.consolidated-data':
        registry_id = payload['meta']['data']['registry_id']
        for patient in payload['patients']:                                       
            saved_patient = RegistryService.get_patient(registry_id, patient['patientId'])

            if saved_patient is None:
                #TODO: Raise an exception here
                print("Patient not found in registry")                
                continue

            patient_registry = PatientRegistry(**saved_patient)
            event_log = EventLog(
                id=str(uuid.uuid4()),
                system='metriport',
                data=payload,
                created_date=datetime.datetime.now().timestamp(),
                modified_date=datetime.datetime.now().timestamp()
            )
            patient_registry.event_logs.append(event_log)
                
            # patient_registry.integration_metriport_fhir_data = patient # TODO: only for debugging
            RegistryService.update_patient(patient_registry)
            print("---------------------METRIPORT WEBHOOK COMPELTED!!--------------------------")        