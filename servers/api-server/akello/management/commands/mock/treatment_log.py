from akello.db.models import TreatmentLog, TreatmentLogScore, ContactTypes, VisitTypes
import random
from faker import Faker

fake = Faker()
Faker.seed(0)


class TreatmentLogMock:


    def create_treatment_log(self, patient_mrn: str, weeks_in_treatment: int, date: int):

        phq9 = TreatmentLogScore(
            score_name='PHQ-9',
            score_value=random.randint(0, 27)
        )

        gad7 = TreatmentLogScore(
            score_name='GAD-7',
            score_value=random.randint(0, 21)
        )    

        return TreatmentLog(
            id=fake.uuid4(),
            patient_mrn=patient_mrn,            
            no_show=False,
            flag=None,
            weeks_in_treatment=weeks_in_treatment,
            contact_type=random.choice([ContactTypes.follow_up, ContactTypes.relapse_prevention, ContactTypes.psychiatric_consultation]),
            visit_type=random.choice([VisitTypes.phone, VisitTypes.clinic, VisitTypes.in_person]),
            scores=[phq9, gad7],
            minutes=random.randint(0, 15),            
            date=date
        )