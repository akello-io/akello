import json
from jsonschema import validate
# from data.database import XFHIRDatabaseManager
from typing import List

with open('./server/data/fhir.schema.json') as schema_file:
    fhir_schema = json.loads(schema_file.read())

class FHIRService:

    def __init__(self):
        pass

    @staticmethod
    def is_resource_valid(resource):
        try:
            validate(instance=resource, schema=fhir_schema)
            return True
        except Exception as e:
            return False

    @staticmethod
    def get_resource_key(account_id, resource_id, resource_type):
        return f'{account_id}-{resource_id}-{resource_type}'

    @staticmethod
    def create_resource(account_id: str, key: str, fhir_json: dict):
        #fhir_resource = FHIRResource(fhir_resource=fhir_json, policies=policies)
        #fhir_db.create(account_id=account_id, key=key, path='.', data=fhir_resource.model_dump_json())
        pass

    @staticmethod
    def delete_resource(account_id: str, key: str):
        #fhir_db.delete(account_id=account_id, key=key)
        pass

    @staticmethod
    def get_resource(key: str):
        #db_obj = xfhir_db.get(key=key)
        #fhir_resource = FHIRResource(**json.loads(db_obj))
        #return fhir_resource
        pass    
