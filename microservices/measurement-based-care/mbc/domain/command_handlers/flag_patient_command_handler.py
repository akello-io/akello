from datetime import datetime, timezone

from mbc.domain.commands.flag_patient_command import FlagPatientCommand
from mbc.domain.ports.patient_query_service import PatientQueryService
from mbc.domain.state_machines.patient_machine.machine import PatientStateMachine


def handle_flag_patient_command(
    command: FlagPatientCommand,
    patient_query_service: PatientQueryService,
) -> bool:
    current_time = datetime.now(timezone.utc).isoformat()
    machine = PatientStateMachine(command.patient, patient_query_service)
    machine.flag(type=command.flag, value=command.is_enabled, timestamp=current_time)
    return True




