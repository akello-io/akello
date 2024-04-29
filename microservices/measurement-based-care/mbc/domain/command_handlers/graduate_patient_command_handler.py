from mbc.domain.commands import graduate_patient_command
from mbc.adapters.dynamodb_query_service import PatientQueryService
from mbc.domain.state_machines.patient_machine.machine import PatientStateMachine


def handle_create_user_command(
    command: graduate_patient_command.GraduatePatientCommand,
    user_query_service: PatientQueryService,
) -> str:
    machine = PatientStateMachine(command.patient, user_query_service)
    machine.graduate()

