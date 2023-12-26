import os, json
import logging

from akello.services import BaseService
from akello.fhir.hl7.fhir_v6_models import Questionnaire
from dataclasses import asdict


logger = logging.getLogger('mangum')


class ScreenerService(BaseService):
    
    @staticmethod
    def get_screeners():
        screeners = os.listdir('akello/screeners')
        questionnaires = []
        for screener in screeners:
            if screener.endswith('R4.json'):                
                with open(f'akello/screeners/{screener}') as f:                    
                    data = json.load(f)
                    screener_questionnaier = Questionnaire(**data)
                    questionnaires.append(asdict(screener_questionnaier))
        return questionnaires

    @staticmethod
    def get_screener_by_id(screener_id):
        pass