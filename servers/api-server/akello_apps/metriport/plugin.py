from akello_apps.base import CorePluginMixin, FHIRPluginMixin
from akello_apps.metriport.client import MetriportAPIClient
from akello_apps.metriport.client import MetaData, OperationEnum
from akello.db.models import PatientRegistry, RegistryModel
from akello.services.registry import RegistryService


class MetriportPlugin(CorePluginMixin, FHIRPluginMixin):
    
    title = "Metriport"
    slug = "metriport"
    description = "Fetch data from health information exchange networks"
    conf_key = "metriport"

    def get_metriport_client(self, registry_id):
        registry = RegistryService.get_registry(registry_id)
        registry = RegistryModel(**registry)
        for app in registry.akello_apps:
            if app.id == self.slug:
                api_key = app.configs.get('Secret Key')
                api_url = app.configs.get('API URL')
                if not api_key:
                    raise ValueError('METRIPORT_API_KEY is not set')
                if not api_url:
                    raise ValueError('METRIPORT_API_URL is not set')

                return MetriportAPIClient(api_key, api_url)

    def get_patient(self, registry_id, patient_id):
        client = self.get_metriport_client(registry_id)
        return client.get_patient(patient_id)
            
    def start_fhir_consolidated_data_query(self, patient_mrn, registry_id):
        client = self.get_metriport_client(registry_id)
        metadata = MetaData(registry_id=registry_id, patient_mrn=patient_mrn, operation=OperationEnum.score)
        resp = client.start_fhir_consolidated_data_query(patient_mrn, metadata.dict())
        return resp