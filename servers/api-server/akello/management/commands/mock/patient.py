from akello.db.models import PatientRegistry, FlagTypes, PatientStatysTypes
from akello.management.commands.mock.treatment_log import TreatmentLogMock
import random, time
from datetime import datetime

from faker import Faker

fake = Faker()
Faker.seed(0)

class PatientMock:
      
    def create_patient(self, registry_id):        
        return PatientRegistry(                        
            id=registry_id,
            patient_flag=random.choice([None, FlagTypes.needs_discussion, FlagTypes.review_with_psychiatrist, FlagTypes.safety_risk]),
            patient_mrn=fake.uuid4(),
            date_created=int(time.mktime(fake.date_this_year(before_today=True).timetuple())),
            date_graduated=int(time.mktime(fake.date_this_year(before_today=True).timetuple())),
            date_modified=int(time.mktime(fake.date_this_year(before_today=True).timetuple())),
            status=random.choices(population=[PatientStatysTypes.enrolled, PatientStatysTypes.treatment,PatientStatysTypes.relapse_prevention_plan,PatientStatysTypes.deactivated,], weights=[ 0.2, 0.4, 0.2, 0.3])[0],
            payer=random.choices([
                'UnitedHealth Group',
                'Anthem, Inc.',
                'Aetna (CVS Health)',
                'Cigna',
                'Humana',
                'Centene Corporation',
                'Molina Healthcare',
                'Blue Cross Blue Shield',
                'Independence Blue Cross',
                'Other'
            ], weights=[
                0.1, 0.2, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1
            ])[0],
            first_name=fake.unique.first_name(),
            last_name=fake.unique.last_name(),
            phone_number=fake.phone_number(),
            email=fake.email(),
            date_of_birth=fake.date(),

            initial_assessment=int(time.mktime(fake.date_this_year(before_today=True).timetuple()))*1000,
            last_follow_up=int(time.mktime(fake.date_this_year(before_today=True).timetuple()))*1000,
            last_psychiatric_consult=int(time.mktime(fake.date_this_year(before_today=True).timetuple()))*1000,
            total_sessions=fake.random_int(1, 10),
            weeks_since_initial_assessment=fake.random_int(1, 10),
            minutes_this_month=fake.random_int(1, 100)
        )
