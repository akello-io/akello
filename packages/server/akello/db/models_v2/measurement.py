from decimal import Decimal
from akello.db.connector.dynamodb import measurements_db
from akello.db.models_v2 import AkelloMeasurement


class Measurement(AkelloMeasurement):
    user_id: str
    registry_id: str
    measurement_group_id: str
    measure: str  # PHQ9, GAD7, treatment-session
    value: Decimal

    @property
    def partition_key(self) -> str:
        return f'user_id:{self.user_id}::registry-id:{self.registry_id}::group-id:{self.measurement_group_id}::measure:{self.measure}'

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