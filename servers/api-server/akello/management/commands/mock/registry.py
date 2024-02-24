from akello.management.commands.mock.user import UserMock
from akello.management.commands.mock.patient import PatientMock
from akello.management.commands.mock.treatment_log import TreatmentLogMock
from akello.db.models import RegistryModel, PatientRegistry
from akello.services.registry import RegistryService
from akello.services.user import UserService    
from faker import Faker

fake = Faker()
Faker.seed(0)


class RegistryMock:    
    
    def create_registry(self, name: str, description: str, questionnaires, logo_url: str = None):
        return RegistryService.create_registry(
            name=name, 
            description=description, 
            questionnaires=questionnaires, 
            integrations=[], 
            logo_url=logo_url
        )               
    
    def add_user(self, user: UserMock):  
        UserService.create_user_registry(user.cognito_user_id, self.id)
        RegistryService.update_stats(self.id)
        
    def refer_patient(self, patient_registry: PatientRegistry):        
        RegistryService.refer_patient(patient_registry)
        RegistryService.update_stats(patient_registry.id)

    def add_treatment_log(self, patient_registry: PatientRegistry, weeks_in_treatment: int):
        treatment_log = TreatmentLogMock().create_treatment_log(
            patient_mrn=patient_registry.patient_mrn, 
            weeks_in_treatment=weeks_in_treatment, 
            date=int(fake.unix_time()),
        )  
         
        RegistryService.add_treatment_log(patient_registry.id, patient_registry.patient_mrn, treatment_log)