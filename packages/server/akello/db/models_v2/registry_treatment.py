import datetime
import json
from decimal import Decimal
from typing import Optional, List
import uuid

from akello.db.models_v2 import AkelloBaseModel
from akello.db.models_v2.user import User
from akello.db.types import FlagTypes, PatientStatysTypes


class RegistryTreatment(AkelloBaseModel):
    registry_id: str
    user_id: str  # User ID of the patient
    mrn: str
    referring_npi: Optional[str] = None
    payer: Optional[str] = None
    status: PatientStatysTypes = PatientStatysTypes.enrolled
    flags: List[FlagTypes] = []

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

    def __init__(self, **data):
        super().__init__(
            id=str(uuid.uuid4()),
            **data
        )

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


class RegistryTreatmentLog(AkelloBaseModel):
    registry_id: str
    user_id: str
    timestamp: str

    @property
    def partition_key(self) -> str:
        return 'treatment-log::registry-id:%s::user-id%s' % (self.registry_id, self.user_id)

    @property
    def sort_key(self) -> str:
        return str(self.timestamp)

    def put(self):
        self._AkelloBaseModel__put()

    def set_scores(self, key: str, value: any):
        self._AkelloBaseModel__add_attribute(key, value)


class RegistryTreatmentLogCommentLog(AkelloBaseModel):
    registry_id: str
    user_id: str
    timestamp: str
    comment: str
    author_user_id: str

    @property
    def partition_key(self) -> str:
        return 'treatment-log-comment::registry-id:%s::user-id%s' % (self.registry_id, self.user_id)

    @property
    def sort_key(self) -> str:
        return str(self.timestamp)

    def put(self):
        self._AkelloBaseModel__put()



