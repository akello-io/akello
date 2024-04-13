import datetime
import json
from typing import Optional, List
import uuid

from akello.db.models_v2 import AkelloBaseModel
from akello.db.models_v2.user import User
from akello.db.types import FlagTypes, PatientStatysTypes


class PatientRegistry(AkelloBaseModel):
    id: str
    patient_id: str
    registry_id: str

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
        return 'patient-id:%s' % self.patient_id

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


    def toJson(self):
        data = json.loads(self.model_dump_json())
        data['partition_key'] = self.partition_key
        data['sort_key'] = self.sort_key
        return data

    def add_approvde_provider(self):
        ## Add a new column for every approvede provider ID
        ## column name: approved_provider_id-<provider_id>
        ## column value: date of consent
        self.add_attribute('approved_provider_id-%s' % self.referring_npi, datetime.datetime.utcnow().timestamp())
        pass


class PatientRegistryLog(AkelloBaseModel):

    @property
    def object_type(self):
        return 'patient-registry-log'

    @property
    def sort_key(self) -> str:
        return 'type:treatment-log:%s' % self.patient_mrn
        # return 'type:audit-log:%s' % self.patient_mrn
