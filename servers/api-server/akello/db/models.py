from pydantic import BaseModel
from typing import List, Optional, Union
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import datetime, json
from decimal import Decimal
from enum import Enum
from akello.db.connector.dynamodb import registry_db, RegistryDBBaseModel


class Response(BaseModel):
    id: str
    response: str
    score: int


class Question(BaseModel):
    id: str
    question: str
    responses: List[Response]
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
    measurements: Union[List[Question], List[FHIRWeight]]


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


class UserModel(RegistryDBBaseModel):
    cognito_user_id: int
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    registries: List[str] = []

    @property
    def partition_key(self) -> str:
        return 'user:' + self.cognito_user_id

    @property
    def sort_key(self) -> str:
        return 'profile'


class UserRegistry(RegistryDBBaseModel):
    user_id: str
    registry_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return 'user-registry:' + self.user_id

    @property
    def sort_key(self) -> str:
        return 'registry:' + self.registry_id


class RegistryUser(RegistryDBBaseModel):
    registry_id: str
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()
    first_name: str
    last_name: str
    email: str
    role: UserRole
    is_admin: bool = False

    @property
    def partition_key(self) -> str:
        return 'registry-user:' + self.registry_id

    @property
    def sort_key(self) -> str:
        return 'user:' + self.user_id


class UserEmail(RegistryDBBaseModel):
    email: str
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return 'user-email:' + self.email

    @property
    def sort_key(self) -> str:
        return self.user_id


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


class RegistryIntegration(BaseModel):
    name: str
    api_key: str


class RegistryModel(RegistryDBBaseModel):
    id: str
    name: str
    description: str
    modified_date: float
    created_date: float
    members: int = 0
    active_patients: int = 0
    questionnaires: List[Measurement] = None
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
    first_name: str
    last_name: str
    phone_number: str
    email: str
    date_of_birth: str
    treatment_logs: List[TreatmentLog] = []
    event_logs: List[EventLog] = []
    audit_logs: List[AuditLog] = []
    flags: List[dict] = []
    status: PatientStatysTypes = PatientStatysTypes.enrolled
    initial_assessment: Optional[int] = None
    last_follow_up: Optional[int] = None
    last_psychiatric_consult: Optional[int] = None
    relapse_prevention_plan: Optional[int] = None
    total_sessions: Optional[int] = 0
    weeks_since_initial_assessment: Optional[int] = 0
    minutes_this_month: Optional[int] = 0
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


class FinancialModel(BaseModel):
    schema_version: str
    user_id: str
    name: str
    description: str
    address_state: str

    full_time_pcps: int
    pct_pcps_participation: float
    monthly_pcp_referrals: int
    pct_patients_accepting_cocm: float
    pct_patients_graduating: float

    payer_distribution_medicare: float
    payer_distribution_medicare_cocm_expected: float
    payer_distribution_medicaid: float
    payer_distribution_medicaid_cocm_expected: float
    payer_distribution_commercial_cocm: float
    payer_distribution_commercial_cocm_cocm_expected: float
    payer_distribution_commercial_no_cocm: float

    caseload_complexity_pct_patients_suicidality: float = 0
    caseload_complexity_pct_patients_prior_ed: float = 0
    caseload_complexity_pct_patients_substance_abuse: float = 0
    caseload_complexity_pct_patients_above_moderate: float = 0

    care_manager_salary: float
    care_manager_benefits: float
    psychiatrist_salary: float
    psychiatrist_benefits: float

    service_unit_direct_bhm__warm_connection_over_16: float
    service_unit_direct_bhm__initial_assessment_visit: float
    service_unit_direct_bhm__follow_up_visit: float
    service_unit_direct_bhm__group_treatment: float
    service_unit_other_bhm__warm_connection_under1_16: float
    service_unit_other_bhm__outreach_attempts: float
    service_unit_other_bhm__telephone_visit: float
    service_unit_other_bhm__caseload_patient_and_psych_consult: float
    service_unit_other_bhm__team_communication: float
    service_unit_other_bhm__registry_management: float
    service_unit_admin_bhm__charting: float
    service_unit_admin_bhm__other: float

    service_unit_direct_cp_treatment_visit: float
    service_unit_direct_cp_follow_up: float
    service_unit_other_cp_registry_review: float
    service_unit_other_cp_direct_pcp_communication: float
    service_unit_other_cp_caseload_review: float
    service_unit_other_cp_charting: float
    service_unit_other_cp_other: float

    billing_rate_not_seen__patients: float
    billing_rate_not_seen__avg_amount: float
    billing_rate_G2214__patients: float
    billing_rate_G2214__avg_amount: float
    billing_rate_99492__patients: float
    billing_rate_99492__avg_amount: float
    billing_rate_99492_99494__patients: float
    billing_rate_99492_99494__avg_amount: float
    billing_rate_99492_99494x2__patients: float
    billing_rate_99492_99494x2__avg_amount: float
    billing_rate_99493__patients: float
    billing_rate_99493__avg_amount: float
    billing_rate_99493_99494__patients: float
    billing_rate_99493_99494__avg_amount: float
    billing_rate_99493_99494x2__patients: float
    billing_rate_99493_99494x2__avg_amount: float

    modified_date: float
    created_date: float

    @property
    def partition_key(self) -> str:
        return 'financial_model:' + self.user_id

    @property
    def sort_key(self) -> str:
        return self.name

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Foo",
                }
            ]
        }
    }