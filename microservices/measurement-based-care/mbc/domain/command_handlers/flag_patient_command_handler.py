import uuid
from datetime import datetime, timezone

from mbc.domain.commands.flag_patient_command import FlagPatientCommand
from mbc.domain.ports.patient_query_service import PatientQueryService
from mbc.domain.patient_state_machine.patient_state_machine import CoCMPatientStateMachine


def handle_flag_patient_command(
    command: FlagPatientCommand,
    patient_query_service: PatientQueryService,
) -> bool:
    current_time = datetime.now(timezone.utc).isoformat()
    machine = CoCMPatientStateMachine(command.patient, patient_query_service)
    machine.flag(type=command.flag, value=command.is_enabled, timestamp=current_time)
    return True




