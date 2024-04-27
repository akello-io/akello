from transitions import Machine
from mbc.domain.ports.patient_query_service import PatientQueryService


class CoCMPatientStateMachine:

    patient_id: str
    patient_query_service: PatientQueryService

    def __init__(self, patient_id: str, patient_query_service: PatientQueryService) -> None:
        self.patient_id = patient_id
        self.patient_query_service = patient_query_service

        states = [
            'referred',
            'treatment',
            'relapse_prevention',
            'discharged'
        ]

        self.machine = Machine(model=self, states=states, initial='referred')
        self.machine.add_transition('accept', 'referred', 'treatment', before='before_treatment_transition', after='after_treatment_transition', conditions='has_consented')
        self.machine.add_transition('action_flag_safety_risk', 'treatment', 'treatment', before='before_safety_risk')
        self.machine.add_transition('action_flag_needs_discussion', 'treatment', 'treatment', before='before_needs_discussion')
        self.machine.add_transition('action_flag_psychiatric_consult', 'treatment', 'treatment', before='before_psychiatric_consult')
        self.machine.add_transition('action_caseload_review', 'treatment', 'treatment', after='after_caseload_review')
        self.machine.add_transition('action_patient_session', 'treatment', 'treatment', after='after_patient_session')
        self.machine.add_transition('graduate', 'treatment', 'relapse_prevention', before='before_relapse_prevention_transition', after='after_relapse_prevention_transition')
        self.machine.add_transition('discharge', '*', 'discharged', before='before_discharged_transition', after='after_discharged_transition')


    def has_consented(self):
        return True

    def before_transition(self):
        print("Before transition")

    def before_safety_risk(self):
        self.before_transition()
        print("Before safety risk")

    def before_needs_discussion(self):
        self.before_transition()
        print("Before needs discussion")

    def before_psychiatric_consult(self):
        self.before_transition()
        print("Before psychiatric consult")

    def before_treatment_transition(self):
        self.before_transition()
        print("Before treatment transition")

    def before_relapse_prevention_transition(self):
        self.before_transition()
        print("Before relapse_prevntion transition")

    def before_discharged_transition(self):
        self.before_transition()
        print("Before discharged transition")

    def after_transition(self):
        print("After transition")

    def after_treatment_transition(self):
        self.after_transition()
        print("After treatment transition")

    def after_caseload_review(self):
        self.after_transition()
        print("After caseload review")

    def after_patient_session(self):
        self.after_transition()
        print("After patient session")

    def after_relapse_prevention_transition(self):
        self.after_transition()
        print("After relapse_prevntion transition")

    def after_discharged_transition(self):
        self.after_transition()
        print("After discharged transition")

    def on_enter(self):
        print("Entering state")

    def on_enter_treatment(self):
        self.on_enter()
        print("Entering treatment")

    def on_enter_relapse_prevntion(self):
        self.on_enter()
        print("Entering relapse_prevntion")

    def on_enter_discharged(self):
        print("Entering discharged")

    def on_exit(self):
        print("Exiting state")

    def on_exit_treatment(self):
        self.on_exit()
        print("Exiting treatment")

    def on_exit_relapse_prevntion(self):
        self.on_exit()
        print("Exiting relapse_prevntion")

    def on_exit_discharged(self):
        self.on_exit()
        print("Exiting discharged")


# import pdb;pdb.set_trace()


patient = CoCMPatientStateMachine('123', None)

print('=========> accept')
patient.accept()
print('=========> flag')
patient.action_flag_safety_risk()
print('=========> flag')
patient.action_flag_needs_discussion()
print('=========> flag')
patient.action_flag_psychiatric_consult()
print('=========> action')
patient.action_caseload_review()
print('=========> action')
patient.action_patient_session()
print('=========> graduate')
patient.graduate()
print('=========> discharge')
patient.discharge()