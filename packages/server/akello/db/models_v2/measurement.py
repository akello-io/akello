from decimal import Decimal
import datetime
from pydantic import BaseModel, computed_field
from akello.db.connector.dynamodb import measurements_db


class Measurement(BaseModel):
    user_id: str
    registry_id: str
    measurement_group_id: str
    measure: str
    value: Decimal

    @property
    def partition_key(self) -> str:
        return f'user_id:{self.user_id}::registry-id:{self.registry_id}::group-id:{self.measurement_group_id}::measure:{self.measure}'

    @computed_field
    @property
    def timestamp(self) -> Decimal:
        return Decimal(datetime.datetime.utcnow().timestamp())


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