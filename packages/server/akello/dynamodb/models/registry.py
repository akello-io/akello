from akello.dynamodb.models import RegistryDBBaseModel
from enum import Enum
from pydantic import BaseModel
from typing import List, Optional
import json
import datetime


class Medication(BaseModel):
    medication: str
    dose: str
    start_date: float
    end_date: Optional[float]
    created_date: float


class ScreeningTypes(str, Enum):
    phq9 = 'phq9'
    gad7 = 'gad7'


class Screening(BaseModel):
    created_date: float
    type: ScreeningTypes
    score: int
    responses: List[int]


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


class TreatmentLog(BaseModel):
    patient_mrn: Optional[str] = None
    contact_type: ContactTypes
    flag: Optional[FlagTypes] = None
    weeks_in_treatment: int
    visit_type: VisitTypes
    phq9_score: Optional[int] = None
    gad7_score: Optional[int] = None
    minutes: Optional[int] = None
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


class RegistryModel(RegistryDBBaseModel):
    id: str
    name: str
    modified_date: float
    created_date: float
    members: int = 0
    active_patients: int = 0

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

    first_name: str
    last_name: str
    phone_number: str
    email: str
    date_of_birth: str
    medications: List[Medication] = []
    screening: List[Screening] = []
    treatment_logs: List[TreatmentLog] = []
    audit_logs: List[AuditLog] = []
    flags: List[dict] = []

    status: PatientStatysTypes = PatientStatysTypes.enrolled
    phq9_first: Optional[int] = None
    phq9_last: Optional[int] = None
    phq9_last_date: Optional[int] = None

    gad7_first: Optional[int] = None
    gad7_last: Optional[int] = None
    gad7_last_date: Optional[int] = None

    initial_assessment: Optional[int] = None
    last_follow_up: Optional[int] = None
    last_psychiatric_consult: Optional[int] = None

    relapse_prevention_plan: Optional[int] = None
    total_sessions: Optional[int] = 0
    weeks_since_initial_assessment: Optional[int] = 0   #TODO: This gets calculated from the client side, remove field
    minutes_this_month: Optional[int] = 0  #TODO: This gets calculated from the client side, remove field
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
