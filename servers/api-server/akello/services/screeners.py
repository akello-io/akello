import os, json
import logging

from akello.services import BaseService
from akello.dynamodb.models.questionnaire import Questionnaire


logger = logging.getLogger('mangum')


class ScreenerService(BaseService):
    
    @staticmethod
    def get_screeners():
        screeners = os.listdir('akello/screeners/questionnaires')
        questionnaires = []
        for screener in screeners:
            if screener.endswith('.json'):
                with open(f'akello/screeners/questionnaires/{screener}') as f:
                    data = json.load(f)
                    questionnaire = Questionnaire(**data)
                    questionnaires.append(questionnaire.dict())
        return questionnaires

    @staticmethod
    def get_screener_by_id(screener_id):
        pass

    def generate_questionnaire_response(self, questionnaire_response):
        # Example: https://build.fhir.org/ig/HL7/sdc/QuestionnaireResponse-questionnaireresponse-sdc-profile-example-PHQ9.json.html
        pass