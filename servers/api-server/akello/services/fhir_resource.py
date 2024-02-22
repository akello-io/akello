import uuid, random, json
from akello.dynamodb import registry_db
from jsonschema import validate
from decimal import Decimal


with open('./akello/data/fhir.schema.json') as schema_file:
    fhir_schema = json.loads(schema_file.read())


class FHIRResourceService:
    
    @staticmethod
    def is_resource_valid(resource):
        try:
            validate(instance=resource, schema=fhir_schema)
            return True
        except Exception as e:
            return False
    
    @staticmethod
    def create_fhir_resource(resource):

        if not FHIRResourceService.is_resource_valid(resource):
            raise Exception('Invalid FHIR Resource')

        rd = random.Random()
        resource['id'] = str(uuid.UUID(int=rd.getrandbits(128)))
        resource['partition_key'] = resource['resourceType']
        resource['sort_key'] = resource['id']

        response = registry_db.put_item(
            Item=resource
        )
        
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
        return resource['id']
    
    @staticmethod
    def get_fhir_resource(resource_type, resource_id):
        response = registry_db.get_item(
            Key={
                'partition_key': resource_type,
                'sort_key': resource_id
            }
        )
        
        return response['Item']