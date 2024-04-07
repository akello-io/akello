import os
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

    def get_metriport_registry_client(self, registry_id):
        """
        Get the Metriport client for the given registry
        """
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


    def get_metriport_client(self):
        """
        Get the Metriport client from the server environment variables
        """
        api_url = os.environ.get('METRIPORT_API_URL')
        api_key = os.environ.get('METRIPORT_API_KEY')

        assert api_key, 'METRIPORT_API_KEY is not set'
        assert api_url, 'METRIPORT_API_URL is not set'

        return MetriportAPIClient(api_key, api_url)


    def get_patient(self, registry_id, patient_id):
        client = self.get_metriport_client()
        return client.get_patient(patient_id)

    def start_fhir_consolidated_data_query(self, registry_id, patient_mrn):
        client = self.get_metriport_client()
        metadata = MetaData(registry_id=registry_id, patient_mrn=patient_mrn, operation=OperationEnum.score)
        resp = client.start_fhir_consolidated_data_query(patient_mrn, metadata.dict())
        return resp