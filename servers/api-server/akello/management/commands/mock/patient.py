from akello.db.models import PatientRegistry, FlagTypes, PatientStatysTypes
from akello.management.commands.mock.treatment_log import TreatmentLogMock
import random
from faker import Faker

fake = Faker()
Faker.seed(0)

class PatientMock:
      
    def create_patient(self, registry_id):
        return PatientRegistry(                        
            id=registry_id,
            patient_flag=random.choice([None, FlagTypes.needs_discussion, FlagTypes.review_with_psychiatrist, FlagTypes.safety_risk]),
            patient_mrn=fake.uuid4(),
            date_created=fake.unix_time(),
            date_graduated=fake.unix_time(),
            date_modified=fake.unix_time(),
            status=random.choice([
                PatientStatysTypes.enrolled, PatientStatysTypes.treatment,
                PatientStatysTypes.relapse_prevention_plan,
                PatientStatysTypes.deactivated,
            ]),
            payer=random.choice([
                'Medicare',
                'Medicaid',
                'Commercial CoCM OK',
                'Commercial CoCM Not OK'
            ]),
            first_name=fake.unique.first_name(),
            last_name=fake.unique.last_name(),
            phone_number=fake.phone_number(),
            email=fake.email(),
            date_of_birth=fake.date()            
        )
