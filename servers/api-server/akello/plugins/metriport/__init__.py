import os
from akello.plugins.mixin_base import PatientMixinBase
from akello.plugins.metriport.api import Organization, Facility, Patient, Document


"""
TODO:
- Get Patient and register an event log
- attach the event ID to metriport's meta data
- lookup the metriport event ID in the patients event logs and attach the data
"""


class MetriportMixinStartFHIRConsolidatedQuery(PatientMixinBase):

    # Trigger a consolidated data query for the given patient

    def run(self, *args, **kwargs):
        print("running MetriportMixinStartFHIRConsolidatedQuery")        

        api_key = os.getenv('METRIPORT_API_KEY', None)
        api_url = os.getenv('METRIPORT_API_URL', None)
        assert api_key and api_url

        patient_mrn = kwargs['patient_mrn']
        registry_id = kwargs['registry_id']
        assert patient_mrn and registry_id
        
        patient = Patient(api_key=api_key, api_url=api_url)
    
        resp = patient.start_fhir_consolidated_data_query(patient_mrn, registry_id)
        assert resp.status_code == 200 or resp.status_code == 404        
        if resp.status_code == 404:
            print("Patient not found in Metriport")
            return
        return resp


class MetriportMixinStartDocumentQuery(PatientMixinBase):

    # Triggers a document query for the specified patient across HIEs.

    def run(self, *args, **kwargs):
        print("running MetriportMixinStartDocumentQuery")        

        api_key = os.getenv('METRIPORT_API_KEY', None)
        api_url = os.getenv('METRIPORT_API_URL', None)
        assert api_key and api_url

        patient_mrn = kwargs['patient_mrn']
        registry_id = kwargs['registry_id']
        assert patient_mrn and registry_id
        
        document = Document(api_key=api_key, api_url=api_url)
        resp = document.start_document_query(patient_mrn, registry_id) 
        assert resp.status_code == 200 or resp.status_code == 404
        if resp.status_code == 404:
            print("Patient not found in Metriport")
            return
        return resp

        
        
        