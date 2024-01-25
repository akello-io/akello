from fastapi import APIRouter
from akello.services.registry import RegistryService
from akello.dynamodb.models.registry import PatientRegistry
import logging

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

        print("registry_id: %s" % registry_id)

        for patient in payload['patients']:
            print(patient['patientId'])
            print(patient['externalId'])
            print(patient['status'])
            print(patient['bundle'])
            print(patient['filters'])

            saved_patient = RegistryService.get_patient(registry_id, patient['patientId'])
            patient_registry = PatientRegistry(**saved_patient)
            patient_registry.integration_metriport_fhir_data = patient # TODO: only for debugging
            RegistryService.update_patient(patient_registry)
