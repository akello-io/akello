import json
import logging

from fastapi import APIRouter

from akello.db.models import PatientRegistry, EventLog
from akello.services.registry import RegistryService


logger = logging.getLogger('mangum')
router = APIRouter()

@router.post("/metriport/webhook")
async def metriport_webhook(payload: dict):
    print("received metriport webhook call")
    print("-----------------------------------")
    print(json.dumps(payload, indent = 4))    
    print("-----------------------------------")

    if 'data' not in payload['meta']:
        print("No data in payload")
        return
  
    mixin = payload['meta']['data']['mixin']
    registry_id = payload['meta']['data']['registry_id']


    if mixin == 'MetriportPatientSessionTreatmentLog':
        patient_mrn = payload['meta']['data']['patient_mrn']
        treatment_log_id = payload['meta']['data']['treatment_log_id']
        patient = RegistryService.get_patient(registry_id, patient_mrn)
        patient = PatientRegistry(**patient)        
        scores = [
            {
                'score_name': 'test-score-total',
                'score_value': 10
            }
        ]
        for treatment_log in patient.treatment_logs:
            if treatment_log.id == treatment_log_id:
                treatment_log.scores = scores
        RegistryService.update_patient(patient)