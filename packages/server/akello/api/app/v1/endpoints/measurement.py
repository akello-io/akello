import logging
import os

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from fastapi import APIRouter, Depends
from akello.auth.provider import auth_token_check
from akello.db.models_v2.measurementvalue import MeasurementValue, MeasurementType
from akello.db.models_v2.user import UserRegistry, UserRegistryRole
from akello.db.models_v2.registry_treatment import RegistryTreatment

from akello.db.models_v2.user import UserRegistry, UserRegistryRole
from akello.db.models_v2.registry import Registry

from pydantic import BaseModel

logger = logging.getLogger('mangum')
router = APIRouter()


@router.post("/timelog")
async def save_timelog(payload: MeasurementValue, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    user_id: str # the patient
    registry_id: str # the registry the patient is in
    reported_by_user_id: str # user who took the measurement
    measure: str  # PHQ9, GAD7, treatment-session
    value: Decimal

    measures:
    - patient_caseload_review_minutes: Decimal
    - patient_session_minutes: Decimal

    """
    user_registry = UserRegistry.get_by_key(UserRegistry, 'user-id:%s' % auth.cognito_id, 'registry-id:%s' % payload.registry_id)

    assert user_registry, 'User not found in registry'
    assert user_registry.role == UserRegistryRole.admin, 'User does not have permission to save measurement'

    measurement_value = MeasurementValue(user_id=payload.user_id, registry_id=payload.registry_id, reported_by_user_id=auth.cognito_id, measure=payload.measure, value=payload.value)
    measurement_value.put()
    return {
        'message': 'Measurement saved'
    }


@router.get("/timelog")
async def get_timelog(user_id: str, registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_treatment = RegistryTreatment.get_by_key(RegistryTreatment, 'registry-id:%s' % registry_id, 'treatment-user-id:%s' % user_id)
    assert registry_treatment, 'User not found in registry'

    session_minutes = registry_treatment.fetch_measurement(MeasurementType.patient_session_minutes)
    caseload_review_minutes = registry_treatment.fetch_measurement(MeasurementType.patient_caseload_review_minutes)

    registry = Registry(
        id=registry_id
    )

    users = registry.fetch_users(requesting_user_id=auth.cognito_id)
    user_map = {user.id: user for user in users}
    response = []

    for session_minute in session_minutes:
        response.append({
            'measure': MeasurementType.patient_session_minutes,
            'value': session_minute.value,
            'reported_by_user_id': user_map[session_minute.reported_by_user_id],
            'date': session_minute.timestamp
        })

    for caseload_review_minute in caseload_review_minutes:
        response.append({
            'measure': MeasurementType.patient_caseload_review_minutes,
            'value': caseload_review_minute.value,
            'reported_by_user_id': user_map[caseload_review_minute.reported_by_user_id],
            'date': caseload_review_minute.timestamp
        })

    return response