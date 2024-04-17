from enum import Enum
from typing import List, Optional, Union

from pydantic import BaseModel


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


class UserRole(str, Enum):
    care_manager = 'Care Manager'
    primary_care_physician = 'Primary Care Physician'
    consulting_psychiatrist = 'Consulting Psychiatrist'
    clinical_ops = 'Clinical Ops'
    finance = 'Finance'


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


class PatientStatus(str, Enum):
    accepted = 'Accepted'
    enrolled = 'Enrolled'
    treatment = 'Treatment'
    relapse_prevention_plan = 'Relapse Prevention Plan'
    deactivated = 'Deactivated'
