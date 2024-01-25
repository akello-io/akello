from akello.dynamodb.models import RegistryDBBaseModel
from enum import Enum
from pydantic import BaseModel
from typing import List, Optional
import json
import datetime


class FlagTypes(str, Enum):
    needs_discussion = 'Needs Discussion'
    review_with_psychiatrist = 'Review with Psychiatrist'
    safety_risk = 'Safety Risk'


class ContactTypes(str, Enum):
    initial_assessment = 'Initial Assessment'
    follow_up = 'Follow Up'
    psychiatric_consultation = 'Psychiatric Consultation'
    relapse_prevention = 'Relapse Prevention Plan'


class VisitTypes(str, Enum):
    clinic = 'Clinic'
    phone = 'Phone'
    in_person = 'In-person w/ Patient'


class TreatmentLogScore(BaseModel):
    score_name: str
    score_value: int


class TreatmentLog(BaseModel):
    patient_mrn: Optional[str] = None
    provider: Optional[str] = None

    # TODO: Add a UI to flag if a user was a no-show
    no_show: Optional[bool] = False

    flag: Optional[FlagTypes] = None
    weeks_in_treatment: int
    contact_type: ContactTypes
    visit_type: VisitTypes

    scores: List[TreatmentLogScore] = []

    minutes: Optional[int] = None

    # TODO: Need to implement a notification workflow
    sms_reminder_sent_date: Optional[float] = None
    sms_conformation_received_date: Optional[float] = None
    total_sms_reminders_sent: Optional[int] = 0

    # TODO: Need to implement a notification workflow
    email_reminder_sent_date: Optional[float] = None
    email_conformation_received_date: Optional[float] = None
    total_email_reminders_sent: Optional[int] = 0

    # TODO: Allow the ability to schedule future sessions
    date: float


class AuditLog(BaseModel):
    object_name: str
    action: str
    user_id: str
    created_date: float


class Flag(BaseModel):
    flag_type: FlagTypes
    created_by_provider_id: str
    resolved_by_provider_id: Optional[str]
    resolved_date: Optional[float]
    created_date: float


class PatientStatysTypes(str, Enum):
    enrolled = 'Enrolled'
    treatment = 'Treatment'
    relapse_prevention_plan = 'Relapse Prevention Plan'
    deactivated = 'Deactivated'


class RegistryIntegration(BaseModel):
    name: str
    api_key: str


class RegistryModel(RegistryDBBaseModel):
    id: str
    name: str
    modified_date: float
    created_date: float
    members: int = 0
    active_patients: int = 0
    questionnaires: List[dict] = None
    integrations: List[RegistryIntegration] = []
    logo_url: Optional[str] = None

    @property
    def object_type(self) -> str:
        return 'registry'

    @property
    def sort_key(self) -> str:
        return 'metadata'


class PatientRegistry(RegistryDBBaseModel):
    id: Optional[str] = None
    patient_flag: Optional[FlagTypes] = None
    patient_mrn: str
    date_created: float = datetime.datetime.utcnow().timestamp()
    date_graduated: Optional[float] = None
    date_modified: float = datetime.datetime.utcnow().timestamp()

    payer: Optional[str] = None

    integration_metriport_fhir_data: Optional[dict] = None

    first_name: str
    last_name: str
    phone_number: str
    email: str
    date_of_birth: str
    treatment_logs: List[TreatmentLog] = []
    audit_logs: List[AuditLog] = []
    flags: List[dict] = []

    status: PatientStatysTypes = PatientStatysTypes.enrolled

    initial_assessment: Optional[int] = None
    last_follow_up: Optional[int] = None
    last_psychiatric_consult: Optional[int] = None

    relapse_prevention_plan: Optional[int] = None
    total_sessions: Optional[int] = 0
    weeks_since_initial_assessment: Optional[int] = 0  # TODO: This gets calculated from the client side, remove field
    minutes_this_month: Optional[int] = 0  # TODO: This gets calculated from the client side, remove field
    schema_version: Optional[str] = None

    def toJson(self):
        data = json.loads(self.model_dump_json())
        data['partition_key'] = self.partition_key
        data['sort_key'] = self.sort_key
        return data

    @property
    def object_type(self):
        return 'registry-patient'

    @property
    def sort_key(self) -> str:
        return self.patient_mrn

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Foo",
                }
            ]
        }
    }
