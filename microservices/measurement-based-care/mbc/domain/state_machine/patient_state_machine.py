from transitions import Machine, EventData
from mbc.domain.ports.patient_query_service import PatientQueryService
from mbc.domain.model.patient import Patient


class CoCMPatientStateMachine:

    patient: Patient
    patient_query_service: PatientQueryService

    def __init__(self, patient: Patient, patient_query_service: PatientQueryService) -> None:
        self.patient = patient
        self.patient_query_service = patient_query_service

        states = [
            'referred',
            'treatment',
            'relapse_prevention',
            'discharged'
        ]

        self.machine = Machine(model=self, states=states, initial='referred', send_event=True)
        self.machine.add_transition('accept', 'referred', 'treatment')
        self.machine.add_transition('flag', 'treatment', 'treatment')
        self.machine.add_transition('billable', 'treatment', 'treatment')
        self.machine.add_transition('graduate', 'treatment', 'relapse_prevention')
        self.machine.add_transition('discharge', '*', 'discharged')


    def has_consented(self, event: EventData):
        return True

    def on_enter(self, event: EventData):
        print(f"Triggered event '{event.event.name}'")
        print(event.kwargs)
        #self.patient_query_service.put_patient(self.patient)

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



model_patient = Patient(registry_id='123',user_id='456',created_at=3)
machine = CoCMPatientStateMachine(model_patient, None)

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