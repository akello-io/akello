from decimal import Decimal
import datetime, json
from enum import Enum
from typing import List, Optional, Union

from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from pydantic import BaseModel

from akello.db.connector.dynamodb import registry_db, RegistryDBBaseModel


"""
from fhir.resources.organization import Organization
class FhirResourceLink(RegistryDBBaseModel):    


    @property
    def partition_key(self) -> str:
        # resourceType:id::resourceType:id
        # patient:1234::organization::5678
        # pk:episode_of_care:1234 | sk:encounter::5678
        # episode_of_care:1234::consent::5678
        # store LINKs
        return 'user:' + self.cognito_user_id

    @property
    def sort_key(self) -> str:
        return 'profile'

"""

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
    """
    Represents a financial model.

    Attributes:
        schema_version (str): The version of the schema.
        user_id (str): The ID of the user associated with the model.
        name (str): The name of the model.
        description (str): The description of the model.
        address_state (str): The state of the address.

        full_time_pcps (int): The number of full-time primary care physicians.
        pct_pcps_participation (float): The percentage of PCPs participating.
        monthly_pcp_referrals (int): The number of monthly PCP referrals.
        pct_patients_accepting_cocm (float): The percentage of patients accepting COCM.
        pct_patients_graduating (float): The percentage of patients graduating.

        payer_distribution_medicare (float): The distribution of Medicare payers.
        payer_distribution_medicare_cocm_expected (float): The expected distribution of Medicare payers with COCM.
        payer_distribution_medicaid (float): The distribution of Medicaid payers.
        payer_distribution_medicaid_cocm_expected (float): The expected distribution of Medicaid payers with COCM.
        payer_distribution_commercial_cocm (float): The distribution of commercial payers with COCM.
        payer_distribution_commercial_cocm_cocm_expected (float): The expected distribution of commercial payers with COCM.
        payer_distribution_commercial_no_cocm (float): The distribution of commercial payers without COCM.

        caseload_complexity_pct_patients_suicidality (float): The percentage of patients with suicidality.
        caseload_complexity_pct_patients_prior_ed (float): The percentage of patients with prior ED visits.
        caseload_complexity_pct_patients_substance_abuse (float): The percentage of patients with substance abuse.
        caseload_complexity_pct_patients_above_moderate (float): The percentage of patients with above moderate complexity.

        care_manager_salary (float): The salary of the care manager.
        care_manager_benefits (float): The benefits of the care manager.
        psychiatrist_salary (float): The salary of the psychiatrist.
        psychiatrist_benefits (float): The benefits of the psychiatrist.

        service_unit_direct_bhm__warm_connection_over_16 (float): The service unit for direct BHM warm connection over 16.
        service_unit_direct_bhm__initial_assessment_visit (float): The service unit for direct BHM initial assessment visit.
        service_unit_direct_bhm__follow_up_visit (float): The service unit for direct BHM follow-up visit.
        service_unit_direct_bhm__group_treatment (float): The service unit for direct BHM group treatment.
        service_unit_other_bhm__warm_connection_under1_16 (float): The service unit for other BHM warm connection under 1-16.
        service_unit_other_bhm__outreach_attempts (float): The service unit for other BHM outreach attempts.
        service_unit_other_bhm__telephone_visit (float): The service unit for other BHM telephone visit.
        service_unit_other_bhm__caseload_patient_and_psych_consult (float): The service unit for other BHM caseload patient and psych consult.
        service_unit_other_bhm__team_communication (float): The service unit for other BHM team communication.
        service_unit_other_bhm__registry_management (float): The service unit for other BHM registry management.
        service_unit_admin_bhm__charting (float): The service unit for admin BHM charting.
        service_unit_admin_bhm__other (float): The service unit for admin BHM other.

        service_unit_direct_cp_treatment_visit (float): The service unit for direct CP treatment visit.
        service_unit_direct_cp_follow_up (float): The service unit for direct CP follow-up.
        service_unit_other_cp_registry_review (float): The service unit for other CP registry review.
        service_unit_other_cp_direct_pcp_communication (float): The service unit for other CP direct PCP communication.
        service_unit_other_cp_caseload_review (float): The service unit for other CP caseload review.
        service_unit_other_cp_charting (float): The service unit for other CP charting.
        service_unit_other_cp_other (float): The service unit for other CP other.

        billing_rate_not_seen__patients (float): The billing rate for not seen patients.
        billing_rate_not_seen__avg_amount (float): The average amount for not seen patients.
        billing_rate_G2214__patients (float): The billing rate for G2214 patients.
        billing_rate_G2214__avg_amount (float): The average amount for G2214 patients.
        billing_rate_99492__patients (float): The billing rate for 99492 patients.
        billing_rate_99492__avg_amount (float): The average amount for 99492 patients.
        billing_rate_99492_99494__patients (float): The billing rate for 99492-99494 patients.
        billing_rate_99492_99494__avg_amount (float): The average amount for 99492-99494 patients.
        billing_rate_99492_99494x2__patients (float): The billing rate for 99492-99494x2 patients.
        billing_rate_99492_99494x2__avg_amount (float): The average amount for 99492-99494x2 patients.
        billing_rate_99493__patients (float): The billing rate for 99493 patients.
        billing_rate_99493__avg_amount (float): The average amount for 99493 patients.
        billing_rate_99493_99494__patients (float): The billing rate for 99493-99494 patients.
        billing_rate_99493_99494__avg_amount (float): The average amount for 99493-99494 patients.
        billing_rate_99493_99494x2__patients (float): The billing rate for 99493-99494x2 patients.
        billing_rate_99493_99494x2__avg_amount (float): The average amount for 99493-99494x2 patients.

        modified_date (float): The modified date of the model.
        created_date (float): The created date of the model.

    Properties:
        partition_key (str): The partition key for the model.
        sort_key (str): The sort key for the model.

    Methods:
        None
    """
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