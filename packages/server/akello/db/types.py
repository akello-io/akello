from decimal import Decimal
import datetime, json
from enum import Enum
from typing import List, Optional, Union

from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from pydantic import BaseModel

from akello.db.connector.dynamodb import registry_db, RegistryDBBaseModel


class UserMembershipType(str, Enum):
    account = 'account'
    organization = 'organization'

class QuestionResponse(BaseModel):
    id: str
    response: str
    score: int


class Question(BaseModel):
    id: str
    question: str
    responses: List[QuestionResponse]
    score: int = 0


class FHIRWeight(BaseModel):
    name: str
    jsonPath: str
    codes: List[str]
    weight: int


class Measurement(BaseModel):
    name: str
    uid: str
    type: str
    active: Optional[bool] = False
    measurements: Union[List[Question], List[FHIRWeight]]


class AkelloPlanTier(str, Enum):
    free = 'Free'
    individual = 'Individual'
    teams = 'Teams'
    enterprise = 'Enterprise'

class UserRole(str, Enum):
    care_manager = 'Care Manager'
    primary_care_physician = 'Primary Care Physician'
    consulting_psychiatrist = 'Consulting Psychiatrist'
    clinical_ops = 'Clinical Ops'
    finance = 'Finance'


class UserInvite(BaseModel):
    email: str
    first_name: str
    last_name: str
    invited_by: str
    registry_id: str
    date_created: int
    role: UserRole

    @property
    def partition_key(self) -> str:
        return 'invite:' + self.email

    @property
    def sort_key(self) -> str:
        return 'registry:' + self.registry_id

    @staticmethod
    def create(cognito_user_id, email, role: UserRole, registry_id):
        response = registry_db.put_item(
            Item={
                "partition_key": 'invite:%s' % email,
                "sort_key": registry_id,
                "invited_by": cognito_user_id,
                "email": email,
                "role": role,
                "date_created": Decimal(datetime.datetime.utcnow().timestamp()),
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def get_invites(email):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('invite:%s' % email)
            )

            invited_registeries = []
            for invite in response['Items']:
                invited_registeries.append({
                    'registry_id': invite['sort_key'],
                    'role': invite['role'],
                    'email': invite['email'],
                })

            return invited_registeries
        except ClientError as e:
            print(e)


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
    id: str = None
    patient_mrn: Optional[str] = None
    provider: Optional[str] = None
    no_show: Optional[bool] = False
    flag: Optional[FlagTypes] = None
    cp_npi: Optional[str] = None
    problems_list: Optional[str] = None
    weeks_in_treatment: int
    contact_type: ContactTypes
    visit_type: VisitTypes
    scores: List[TreatmentLogScore] = []
    minutes: Optional[float] = None
    sms_reminder_sent_date: Optional[float] = None
    sms_conformation_received_date: Optional[float] = None
    total_sms_reminders_sent: Optional[int] = 0
    email_reminder_sent_date: Optional[float] = None
    email_conformation_received_date: Optional[float] = None
    total_email_reminders_sent: Optional[int] = 0
    date: float


class EventLog(BaseModel):
    id: str
    system: Optional[str] = None
    data: Optional[dict] = None
    created_date: float
    modified_date: float


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


class AkelloApp(BaseModel):
    id: str
    group: str
    status: str
    name: str
    description: str
    logo: str
    react_component: str
    configs: dict
