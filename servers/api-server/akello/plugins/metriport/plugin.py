from akello.plugins.base import CorePluginMixin, FHIRPluginMixin
from akello.plugins.metriport.client import MetriportAPIClient
from akello.db.models import PatientRegistry
from akello.plugins.metriport.client import MetaData, OperationEnum

import os

class MetriportPlugin(CorePluginMixin, FHIRPluginMixin):
    
    title = "Metriport"
    slug = "metriport"
    description = "Fetch data from health information exchange networks"
    conf_key = "metriport"    

    def __init__(self):
        api_key = os.getenv('METRIPORT_API_KEY', None)
        api_url = os.getenv('METRIPORT_API_URL', None)

        if not api_key:
            raise ValueError('METRIPORT_API_KEY is not set')
        
        if not api_url:
            raise ValueError('METRIPORT_API_URL is not set')        
        
        self.client = self.get_client(api_key, api_url)

    def get_patient(self, patient_id):
        return self.client.get_patient(patient_id)
            
    def start_fhir_consolidated_data_query(self, patient_mrn, registry_id):
        metadata = MetaData(registry_id=registry_id, patient_mrn=patient_mrn, operation=OperationEnum.score)        
        resp = self.client.start_fhir_consolidated_data_query(patient_mrn, metadata.dict())
        return resp

    def get_client(self, api_key, api_url):
        return MetriportAPIClient(api_key, api_url)