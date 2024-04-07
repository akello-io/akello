from akello.db.models import TreatmentLog
from akello.db.types import TreatmentLogScore, ContactTypes, VisitTypes
import random
from faker import Faker

fake = Faker()
Faker.seed(0)


class TreatmentLogMock:


    def create_treatment_log(self, patient_mrn: str, contact_type: ContactTypes, weeks_in_treatment: int, date: int):

        
        phq9 = TreatmentLogScore(
            score_name='PHQ-9',
            score_value=random.randint(5, 24)
        )

        gad7 = TreatmentLogScore(
            score_name='GAD-7',
            score_value=random.randint(5, 24)
        )    

        return TreatmentLog(
            id=fake.uuid4(),
            patient_mrn=patient_mrn,            
            no_show=False,
            flag=None,
            weeks_in_treatment=weeks_in_treatment,
            contact_type=contact_type,
            visit_type=random.choice([VisitTypes.phone, VisitTypes.clinic, VisitTypes.in_person]),
            scores=[phq9, gad7],
            minutes=random.randint(0, 150),            
            date=date
        )