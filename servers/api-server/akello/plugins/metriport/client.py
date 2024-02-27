from akello.plugins.client import BaseAPIClient
from pydantic import BaseModel
from enum import Enum, IntEnum

import json

class OperationEnum(str, Enum):
    score = 'score'    

class MetaData(BaseModel):
    registry_id: str
    patient_mrn: str
    operation: OperationEnum
    treatment_log_id: str = 'none'

class MetriportAPIClient(BaseAPIClient):

    def __init__(self, api_key, api_url):
        super(MetriportAPIClient, self).__init__(api_key, api_url + '/medical/v1')        

    def create_organization(self):
        raise Exception("Not Implemented")
    
    def get_organizations(self):
        raise Exception("Not Implemented")
    
    def update_organization(self):
        raise Exception("Not Implemented")
    
    def create_facility(self):
        raise Exception("Not Implemented")
    
    def get_facility(self):
        raise Exception("Not Implemented")
    
    def update_facility(self):
        raise Exception("Not Implemented")
    
    def list_facilities(self):
        raise Exception("Not Implemented")
    
    def create_patient(self):
        raise Exception("Not Implemented")
    
    def get_patient(self, patient_mrn):
        return self.get('patient/' + patient_mrn)
    
    def update_patient(self):
        raise Exception("Not Implemented")
    
    def list_patients_at_facility(self, facility_id):
        return self.get('patient/?facility_id=' + facility_id)
    
    def delete_patient(self):
        raise Exception("Not Implemented")
    
    def start_fhir_consolidated_data_query(self, patient_mrn, meta_data):                        
        resp = self.post(f'patient/{patient_mrn}/consolidated/query', json.dumps({'metadata': meta_data}))             
        if resp.status_code != 200:
            print(resp.text)
            raise Exception("Failed to start fhir consolidated data query")        
        return resp
    
    def get_fhir_consolidated_data_query_status(self, patient_mrn):
        self.get('patient/' + patient_mrn + '/consolidated/query')
    
    def count_fhir_patient_data(self):
        raise Exception("Not Implemented")
    
    def create_fhir_patient_consolidated_data(self):
        raise Exception("Not Implemented")
    
    def start_document_query(self):
        raise Exception("Not Implemented")
    
    def get_document_query_status(self):
        raise Exception("Not Implemented")
    
    def list_documents(self):
        raise Exception("Not Implemented")
    
    def upload_document(self):
        raise Exception("Not Implemented")
    
    def start_bulk_get_document_url(self):
        raise Exception("Not Implemented")