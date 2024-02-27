import os
from akello.plugins.mixin_base import PatientMixinBase
from akello.plugins.metriport.api import Organization, Facility, Patient, Document


"""
TODO:
- Get Patient and register an event log
- attach the event ID to metriport's meta data
- lookup the metriport event ID in the patients event logs and attach the data
"""



class MetriportPatientSessionTreatmentLog(PatientMixinBase):
    #TOOD: Create a treatment log for the patient
    # When a patient treatment log is created we should attach a new scope to the patient generated
    # By a FHIR Query
    """
    Calculation:

    Use a template file to process the FHIR data

    {
        score_name: 'xxxx',
        score_value: 'xxxx',
    }

    Create a page to customize the template file to determine how to score the data
    - make sure the template file gets versioned (CHMOD)
    
    """
    
    def run(self, *args, **kwargs):
        api_key = os.getenv('METRIPORT_API_KEY', None)
        api_url = os.getenv('METRIPORT_API_URL', None)
        assert api_key and api_url
        
        registry_id = kwargs['registry_id']
        treatment_log = kwargs['treatment_log']
        assert registry_id and treatment_log
 
        patient = Patient(api_key=api_key, api_url=api_url)    
        resp = patient.start_fhir_consolidated_data_query(
            treatment_log.patient_mrn,
            {
                'mixin': 'MetriportPatientSessionTreatmentLog', 
                'registry_id': registry_id, 
                'patient_mrn': treatment_log.patient_mrn,
                'treatment_log_id': treatment_log.id
            }
        )        

        assert resp.status_code == 200 or resp.status_code == 404        
        if resp.status_code == 404:
            print("Patient not found in Metriport")
            return
        return resp




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
        resp = patient.start_fhir_consolidated_data_query(patient_mrn, {'registry_id': registry_id, 'patient_mrn': patient_mrn})

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

        
        
        