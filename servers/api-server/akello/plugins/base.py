from akello.db.models import PatientRegistry

class CorePluginMixin:
    author: str | None = "Akello.io Team"
    author_url: str | None = "https://github.com/akello-io/akello"
    version: str | None = '0.0.1'
    resource_links = [
        ("Report Issue", "https://github.com/akello-io/akello/issues")        
    ]


class FHIRPluginMixin:
    
    def process_fhir_data(self, request):
        print('process fhir data: ', request)

    def request_fhir_data(self, patient_registry: dict):
        print('request patient_registry: ', patient_registry)
        self.start_fhir_consolidated_data_query(patient_registry.patient_mrn, patient_registry.metadata)


class PreWebhookPluginMixin:
    
    type = "pre_webhook"

