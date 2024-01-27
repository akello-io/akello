import os
from akello.plugins.mixin_base import PatientMixinBase
from akello.plugins.metriport.api import Organization, Facility, Patient, Document


class MetriportMixin(PatientMixinBase):

    def run(self, *args, **kwargs):
        print("running MetriportMixin")

        patient_registry = kwargs['patient_registry']

        api_key = os.getenv('METRIPORT_API_KEY', None)
        api_url = os.getenv('METRIPORT_API_URL', None)
        assert api_key and api_url

        patient = Patient(api_key=api_key, api_url=api_url)
        resp = patient.start_fhir_consolidated_data_query(patient.patient_mrn, patient.id)
        assert resp.status_code == 200 or resp.status_code == 404
