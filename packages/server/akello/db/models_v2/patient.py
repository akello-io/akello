import json
import uuid
import datetime
from typing import Optional, List
from akello.db.connector.dynamodb import RegistryDBBaseModel
from akello.db.types import FlagTypes, PatientStatysTypes
from pydantic import BaseModel

class PatientProfile(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: str
    date_of_birth: str
    payer: Optional[str] = None


class Patient(RegistryDBBaseModel):
    id: str = str(uuid.uuid4())
    profile: PatientProfile

    @property
    def object_type(self) -> str:
        return 'patient'

    @property
    def sort_key(self) -> str:
        return 'meta'


class PatientRegistry(RegistryDBBaseModel):
    id: Optional[str] = None
    mrn: str
    referring_npi: Optional[str] = None
    status: PatientStatysTypes = PatientStatysTypes.enrolled
    flags: List[FlagTypes] = []
    profile: PatientProfile

    # Treatment dates
    initial_assessment: Optional[int] = None
    last_follow_up: Optional[int] = None
    last_psychiatric_consult: Optional[int] = None
    relapse_prevention_plan: Optional[int] = None

    # Treatment stats
    total_sessions: Optional[int] = 0
    weeks_since_initial_assessment: Optional[int] = 0
    minutes_this_month: Optional[int] = 0

    # Object Dates
    created: float = datetime.datetime.utcnow().timestamp()
    graduated: Optional[float] = None
    modified: float = datetime.datetime.utcnow().timestamp()

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

    @property
    def object_type(self):
        return 'patient-registry'

    @property
    def sort_key(self) -> str:
        return 'patient-mrn:%s' % self.patient_mrn


class PatientRegistryLog(RegistryDBBaseModel):

    @property
    def object_type(self):
        return 'patient-registry-log'

    @property
    def sort_key(self) -> str:
        return 'type:treatment-log:%s' % self.patient_mrn
        #return 'type:audit-log:%s' % self.patient_mrn
