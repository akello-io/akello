import datetime
import json
from decimal import Decimal
from typing import Optional, List

from akello.db.models import AkelloBaseModel
from akello.db.models.user import User
from akello.db.models.types import FlagTypes, PatientStatus

from akello.db.connector.dynamodb import registry_db, measurements_db

from boto3.dynamodb.conditions import Key
from pydantic import TypeAdapter

from  akello.db.models.measurementvalue import MeasurementValue, MeasurementType


class RegistryTreatment(AkelloBaseModel):
    registry_id: str
    user_id: str  # User ID of the patient
    mrn: str
    referring_npi: Optional[str] = None
    payer: Optional[str] = None
    status: PatientStatus = PatientStatus.enrolled
    flag: Optional[FlagTypes] = None

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    date_of_birth: Optional[str] = None

    # Treatment dates
    initial_assessment: Optional[int] = None
    last_follow_up: Optional[int] = None
    last_psychiatric_consult: Optional[int] = None
    relapse_prevention_plan: Optional[int] = None
    graduated: Optional[float] = None

    # Treatment stats
    total_sessions: Optional[int] = 0
    weeks_since_initial_assessment: Optional[int] = 0
    minutes_this_month: Optional[int] = 0

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.registry_id

    @property
    def sort_key(self) -> str:
        return 'treatment-user-id:%s' % self.user_id

    def toJson(self):
        data = json.loads(self.model_dump_json())
        data['partition_key'] = self.partition_key
        data['sort_key'] = self.sort_key
        return data

    def lookup_approved_provider(self, authorized_user: User):
        ## Check if the authorized user is an approved provider
        # returns date of approval
        return self.get_attribute('approved_provider_id-%s' % authorized_user.id)

    def add_approved_provider(self, authorized_user: User, requesting_user: User):
        ## Add a new column for every approvede provider ID
        assert requesting_user.id == self.user_id, 'Only the patient can approve a provider'
        self._AkelloBaseModel__add_attribute('approved_provider_id:%s' % authorized_user.id,
                                             Decimal(datetime.datetime.utcnow().timestamp()))

    def remove_approved_provider(self, authorized_user: User):
        ## Remove the column for the approvede provider ID
        self._AkelloBaseModel__remove_attribute('approved_provider_id-%s' % authorized_user.id)


    def fetch_measurement(self, measure: MeasurementType):
        ## Fetch all measurements for this patient
        partition_key = f'user_id:{self.user_id}::registry-id:{self.registry_id}::measure:{measure}'
        response = measurements_db.query(KeyConditionExpression=Key('partition_key').eq(partition_key))
        measurements = response.get('Items', [])
        ta = TypeAdapter(List[MeasurementValue])
        return ta.validate_python(measurements)