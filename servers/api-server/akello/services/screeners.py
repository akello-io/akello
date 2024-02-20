import os
import json
import logging
import yaml

from akello.services import BaseService
from akello.dynamodb.models.measurement import Measurement


logger = logging.getLogger('mangum')


class ScreenerService(BaseService):
    
    
    @staticmethod
    #def get_measurements():
    def get_screeners():
        measurement_list = []
        measurements = os.listdir('akello/screeners/measurements')
        for measurement in measurements:
            if measurement.endswith('.yaml'):
                with open(f'akello/screeners/measurements/{measurement}') as f:                
                    try:                                                
                        mobj = Measurement(**yaml.safe_load(f))
                        if mobj.type == 'questionnaire':
                            measurement_list.append(mobj) 
                    except yaml.YAMLError as exc:
                        print(exc)                    
        
        return measurement_list


    """
    @staticmethod
    def get_screeners():
        questionnaires = []
        screeners = os.listdir('akello/screeners/questionnaires')
        for screener in screeners:
            if screener.endswith('.json'):
                with open(f'akello/screeners/questionnaires/{screener}') as f:
                    data = json.load(f)
                    questionnaire = Measurement(**data)
                    questionnaires.append(questionnaire.dict())
        return questionnaires

    """

    @staticmethod
    def get_screener_by_id(screener_id):
        pass

    def generate_questionnaire_response(self, questionnaire_response):
        # Example: https://build.fhir.org/ig/HL7/sdc/QuestionnaireResponse-questionnaireresponse-sdc-profile-example-PHQ9.json.html
        pass