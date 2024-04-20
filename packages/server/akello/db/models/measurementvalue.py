from decimal import Decimal
from enum import Enum

from akello.db.connector.dynamodb import measurements_db
from akello.db.models import AkelloMeasurement

class MeasurementType(str, Enum):
    patient_caseload_review_minutes = 'patient_caseload_review_minutes'
    patient_session_minutes = 'patient_session_minutes'
    patient_assessment_session_minutes = 'patient_assessment_session_minutes'

    patient_self_reported_measurement = 'patient_self_reported_measurement'
    provider_reported_measurement = 'provider_reported_measurement'


class MeasurementValue(AkelloMeasurement):
    user_id: str
    registry_id: str
    reported_by_user_id: str  # user who took the measurement
    measure: MeasurementType
    value: Decimal

    @property
    def partition_key(self) -> str:
        return f'user_id:{self.user_id}::registry-id:{self.registry_id}::measure:{self.measure}'

    def put(self):
        response = measurements_db.put_item(
            Item={
                'partition_key': self.partition_key,
                'timestamp': self.timestamp,
                **self.model_dump()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
