from akello.db.types import FlagTypes, ContactTypes, VisitTypes, TreatmentLog, TreatmentLogScore
import random
from faker import Faker

fake = Faker()
Faker.seed(0)

class PatientMock:
      
    safety_risk_level = 0.1
    medication_complexity = 0.1
    complexity_level = 0.1
    sessions = 0
    max_sessions = 12

    minimum_minutes = 1000
    maximum_minutes = 15000    
    engagement_level = 0.0
    no_show_rate = 0.0
    treatment_response = 0.0
    treatment_logs = []


    def __init__(self, registry_id, referring_npi) -> None:
        self.treatment_logs = []
        pass

    def add_caseload_review(self):
        # Set patient flag
        pass

    def get_contact_type(self):
        contact_type = random.choices(
            population=[ContactTypes.follow_up, ContactTypes.psychiatric_consultation],
            weights=[1, self.complexity_level]
        )[0] 
        if len(self.treatment_logs) == 0:
            contact_type = ContactTypes.initial_assessment
        
        if self.sessions == self.max_sessions:
            contact_type = ContactTypes.relapse_prevention

        return contact_type
    
    def get_scores(self):        
        if len(self.treatment_logs) == 0:
            phq9 = TreatmentLogScore(
                score_name='PHQ-9',
                score_value=random.randint(15, 27)
            )
            gad7 = TreatmentLogScore(
                score_name='GAD-7',
                score_value=random.randint(15, 21)
            )
            return [phq9, gad7]

        scores = []

        for score in self.treatment_logs[-1].scores:
            previous = score.score_value
            max_score = int(previous + 5*self.complexity_level)
            min_score = int(previous - 5*(1-self.complexity_level))
            new_score = TreatmentLogScore(
                score_name=score.score_name,
                score_value=random.randint(min_score, max_score)
            )
            scores.append(new_score)
                        
        return scores

    def add_treatment_log(self):

        weeks_in_treatment = 0
        date = self.patient_registry.date_created
        if len(self.treatment_logs) > 0:
            weeks = random.randint(1, 4)
            date = self.treatment_logs[-1].date   + (weeks * 604800 * 1000)
            
            weeks_in_treatment = int((date-self.treatment_logs[0].date) / (604800 * 1000))
            
        treatment_log = TreatmentLog(
            id=fake.uuid4(),
            patient_mrn=self.patient_registry.patient_mrn,            
            no_show=False,
            flag=None,
            weeks_in_treatment=weeks_in_treatment,
            contact_type=self.get_contact_type(),
            visit_type=random.choice([VisitTypes.phone, VisitTypes.clinic, VisitTypes.in_person]),
            scores=self.get_scores(),
            minutes=float(random.randint(self.minimum_minutes, self.maximum_minutes))/100,            
            date=date
        )
        self.treatment_logs.append(treatment_log)

    def get_patient_flag(self):        
        return random.choices(
            population=[None, FlagTypes.needs_discussion, FlagTypes.review_with_psychiatrist, FlagTypes.safety_risk],
            weights=[0.25, self.complexity_level, self.medication_complexity, self.safety_risk_level]
        )[0]
