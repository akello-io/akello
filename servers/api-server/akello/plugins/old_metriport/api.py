import requests, json


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

    def get_patient(self, patient_mrn):
        response = self.get_request(self.endpoint + '/' + patient_mrn)
        return response
        

    def update_patient(self):
        raise Exception("Not Implemented")

    def list_patients_at_facility(self, facility_id):
        response = self.get_request(self.endpoint + '/?facility_id=' + facility_id)
        return response

    def delete_patient(self):
        raise Exception("Not Implemented")

    def start_fhir_consolidated_data_query(self, patient_mrn, meta_data):  
        response = self.post_request(
            self.endpoint + f'/{patient_mrn}/consolidated/query',            
            payload=json.dumps({"metadata": meta_data}))
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
