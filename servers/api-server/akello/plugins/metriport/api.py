import requests, json

"""
import os
from akello.integrations.metriport.api import Organization, Facility, Patient, Document
api_key=os.getenv('METRIPORT_API_KEY')
api_url=os.getenv('METRIPORT_API_URL')
org = Organization(api_key=api_key, api_url=api_url)
facility = Facility(api_key=api_key, api_url=api_url)
patient = Patient(api_key=api_key, api_url=api_url)
document = Document(api_key=api_key, api_url=api_url)

r = org.get_organizations()
r.json()

r = facility.list_facilities()
facility_id = r.json()['facilities'][0]['id']

r = patient.list_patients_at_facility(facility_id=facility_id)
patient_id = r.json()['patients'][0]['id']

r = document.start_document_query(patient_id=patient_id, facility_id=facility_id)
r.json()

r = document.get_document_query_status(patient_id=patient_id)
r.json()

r = patient.start_fhir_consolidated_data_query(patient_id=patient_id)
r.json()

r = patient.get_fhir_consolidated_data_query_status(patient_id=patient_id)
r.json()


"""


class MetriportAPI(object):

    def __init__(self, api_key, api_url):
        self.api_url = api_url
        self.headers = {"x-api-key": api_key, "Content-Type": "application/json"}


    def get_request(self, endpoint):
        return requests.request("GET", self.api_url + '/medical/v1/' + endpoint, headers=self.headers)

    def post_request(self, endpoint, payload=None):
        return requests.request("POST", self.api_url + '/medical/v1/' + endpoint, headers=self.headers, data=payload)

class Organization(MetriportAPI):
    endpoint = 'organization'

    def create_organization(self):
        raise Exception("Not Implemented")

    def get_organizations(self):
        response = self.get_request(self.endpoint)
        return response

    def update_organization(self):
        raise Exception("Not Implemented")


class Facility(MetriportAPI):
    endpoint = 'facility'

    def create_facility(self):
        raise Exception("Not Implemented")

    def get_facility(self):
        raise Exception("Not Implemented")

    def update_facility(self):
        raise Exception("Not Implemented")

    def list_facilities(self):
        response = self.get_request(self.endpoint)
        return response


class Patient(MetriportAPI):
    endpoint = 'patient'

    def create_patient(self):
        raise Exception("Not Implemented")

    def get_patient(self):
        raise Exception("Not Implemented")

    def update_patient(self):
        raise Exception("Not Implemented")

    def list_patients_at_facility(self, facility_id):
        response = self.get_request(self.endpoint + '/?facility_id=' + facility_id)
        return response

    def delete_patient(self):
        raise Exception("Not Implemented")

    def start_fhir_consolidated_data_query(self, patient_id, registry_id):
        response = self.post_request(
            self.endpoint + f'/{patient_id}/consolidated/query',
            payload=json.dumps({"metadata": {"registry_id": registry_id}}))
        return response

    def get_fhir_consolidated_data_query_status(self, patient_id):
        response = self.get_request(self.endpoint + f'/{patient_id}/consolidated/query')
        return response

    def count_fhir_patient_data(self):
        raise Exception("Not Implemented")

    def create_fhir_patient_consolidated_data(self):
        raise Exception("Not Implemented")


class Document(MetriportAPI):
    endpoint = 'document'

    def start_document_query(self, patient_id, facility_id):
        response = self.post_request(self.endpoint + f'/query/?patientId={patient_id}&facilityId={facility_id}', payload={"metadata": {}})
        return response

    def get_document_query_status(self, patient_id):
        response = self.get_request(self.endpoint + '/query/?patientId=' + patient_id)
        return response

    def list_documents(self):
        raise Exception("Not Implemented")

    def upload_document(self):
        raise Exception("Not Implemented")

    def start_bulk_get_document_url(self):
        raise Exception("Not Implemented")
