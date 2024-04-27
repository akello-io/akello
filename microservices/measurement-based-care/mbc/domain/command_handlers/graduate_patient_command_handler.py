import uuid
from datetime import datetime, timezone

from mbc.domain.commands import graduate_patient_command
from mbc.adapters.dynamodb_query_service import dynamodb_query_service


def handle_create_user_command(
    command: graduate_patient_command.GraduatePatientCommand,
    user_query_service: dynamodb_query_service.PatientQueryService,
) -> str:
    current_time = datetime.now(timezone.utc).isoformat()


