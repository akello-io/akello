import os
import datetime, random, uuid, json
from decimal import Decimal
from akello.dynamodb.models.registry import RegistryModel, ContactTypes, TreatmentLog, PatientRegistry
from akello.services import BaseService
from akello.services.registry import RegistryService
from datetime import datetime
from akello.fhir.hl7.fhir_v6_models import Questionnaire

import logging
logger = logging.getLogger('mangum')


class ScreenerService(BaseService):
    
    @staticmethod
    def list_screeners():
        screeners = os.listdir('akello/screeners')
        for screener in screeners:
            if screener.endswith('R4.json'):                
                with open(f'akello/screeners/{screener}') as f:                    
                    data = json.load(f)
                    screener_questionnaier = Questionnaire(**data)
                    print(screener_questionnaier.title)

    @staticmethod
    def get_screener_by_id(screener_id):
        pass