from mbc.domain.commands.refer_patient_command import ReferPatientCommand
from mbc.domain.ports.patient_query_service import PatientQueryService
from mbc.domain.state_machines.patient_machine.machine import PatientStateMachine


def handle_refer_patient_command(
    command: ReferPatientCommand,
    patient_query_service: PatientQueryService,
) -> bool:
    patient_query_service.create_patient(patient=command.patient)
    return True




