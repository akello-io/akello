from enum import Enum

from pydantic import BaseModel
from transitions import Machine, EventData

from mbc.domain.model.patient import Patient
from mbc.domain.ports.patient_query_service import PatientQueryService



class Trigger(Enum):
    accept = 'accept'
    flag = 'flag'
    billable = 'billable'
    graduate = 'graduate'
    discharge = 'discharge'


class State(Enum):
    referred = 'referred'
    treatment = 'treatment'
    relapse_prevention = 'relapse_prevention'
    discharged = 'discharged'
    all = '*'


class Transition(BaseModel):
    trigger: Trigger
    source: State
    dest: State


class Condition:
    type: str
    params: dict



class CoCMPatientStateMachine:
    patient: Patient
    patient_query_service: PatientQueryService

    def __init__(self, patient: Patient, patient_query_service: PatientQueryService) -> None:
        self.patient_query_service = patient_query_service
        #self.patient = self.patient_query_service.get_patient(patient.user_id)
        self.patient = patient

        states = [s.value for s in State]

        self.machine = Machine(model=self, states=states, initial=patient.state, send_event=True)

    def has_consented(self, event: EventData):
        return True

    def check_assessments(self, event: EventData):
        # based on the patients state, check if the patient has completed all the required assessments
        return True

    def check_measurements(self, event: EventData):
        # based on the patients state, check if the patient has reached the required measurements
        return True

    def add_transition(self, trigger: Trigger, source: State, dest: State, conditions=None):
        self.machine.add_transition(trigger.value, source.value, dest.value, conditions=conditions)

    def on_enter(self, event: EventData):
        print(f"Triggered event '{event.event.name}'")
        print(event.kwargs)
        # self.patient_query_service.put_patient(self.patient)

    def on_enter_treatment(self, event: EventData):
        print("Entering treatment")
        self.on_enter(event)

        self.patient.state = 'treatment'

        match event.event.name:
            case 'accept':
                pass

            case 'flag':
                flag_type = event.kwargs['type']
                value = event.kwargs['value']
                self.patient.flags[flag_type] = value

            case 'billable':
                billable_type = event.kwargs['type']
                minutes = event.kwargs['minutes']
                print(f"Billable event: {billable_type} for {minutes} minutes")

            case 'session':
                pass

            case _:
                raise Exception(f"Unexpected event '{event.event.name}'")

    def on_enter_relapse_prevntion(self, event: EventData):
        print("Entering relapse_prevntion")
        self.on_enter(event)
        self.patient.state = 'relapse_prevention'

    def on_enter_discharged(self, event: EventData):
        print("Entering discharged")
        self.on_enter(event)
        self.patient.state = 'discharged'



from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService

model_patient = Patient(registry_id='123', user_id='456', created_at=3)
machine = CoCMPatientStateMachine(model_patient, DynamoDBPatientQueryService())

machine.add_transition(Trigger.accept, State.referred, State.treatment, conditions=['has_consented', 'check_assessments', 'check_measurements'])
machine.add_transition(Trigger.flag, State.treatment, State.treatment)
machine.add_transition(Trigger.billable, State.treatment, State.treatment)
machine.add_transition(Trigger.graduate, State.treatment, State.relapse_prevention)
machine.add_transition(Trigger.discharge, State.all, State.discharged)

print('=========> accept')
machine.accept()
machine.flag(type='safety-risk', value=True)
machine.billable(type='caseload-review', minutes=3)
machine.billable(type='patient-session', minutes=3)
print('=========> graduate')
machine.graduate()
print('=========> discharge')
machine.discharge()
print(machine.patient)
