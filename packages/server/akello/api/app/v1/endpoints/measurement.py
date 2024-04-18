import logging
import os

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from fastapi import APIRouter, Depends
from akello.auth.provider import auth_token_check
from akello.db.models_v2.measurementvalue import MeasurementValue
from akello.db.models_v2.user import UserRegistry, UserRegistryRole

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


