import dataclasses, json
from dataclasses import asdict
from akello.dynamodb import registry_db

class EnhancedJSONEncoder(json.JSONEncoder):
        def default(self, o):
            if dataclasses.is_dataclass(o):
                return asdict(o, dict_factory=lambda x: {k: v for (k, v) in x if v is not None})  # remove empty values
            return super().default(o)

class XFHIR:
    
    def dict(self):
        return {k: str(v) for k, v in asdict(self).items()}
    
    def save(self, registry_id):        
        fhir_resource = self.dict()
        fhir_resource['partition_key'] = 'registry:%s' % registry_id
        fhir_resource['sort_key'] = f'fhir:{self.resourceType}:{self.id}'

        #TODO: Migrate to XFHIR
        response = registry_db.put_item(
            Item=fhir_resource
        )

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
        return fhir_resource['id']