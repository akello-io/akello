import datetime
import logging
import os
import uuid
from typing import List

import stripe
from fastapi import APIRouter, Depends
from fastapi import Request
from pydantic import BaseModel
from pydantic import TypeAdapter

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check
from akello.db.models.measurementvalue import MeasurementValue
from akello.db.models.registry import Registry, RegistryTreatment, RegistryUser
from akello.db.models.user import User, UserRegistry, UserRegistryRole
from akello.db.types import Measurement


logger = logging.getLogger('mangum')

router = APIRouter()

stripe.api_key = os.getenv('STRIPE_API_KEY', None)


@router.get("/{registry_id}/subscription")
async def check_active_subscription(registry_id: str):
    """
    registry = RegistryService.get_registry(registry_id)
    if 'stripe_customer_id' in registry and registry['stripe_customer_id']:
        subscriptions = StripePaymentService.get_active_stripe_subscriptions(registry['stripe_customer_id'])

        if len(subscriptions) == 0:
            return False

        subscription = subscriptions[0]

        product = StripePaymentService.get_product(subscription['plan']['product'])
        if subscription['status'] == 'active':
            return product['name']
    return False
    """
    return False


@router.post("/create")
async def create_registry(data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    logger.info('creating a new registry name: %s - created by user: %s' % (data['name'], auth.username))

    # Create the registry and link the user to the registry
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry(
        id=str(uuid.uuid4()),
        name=data['name'],
    )
    registry.create(requesting_user=user)
    return {'id': registry.id, 'name': data['name']}


@router.get("/{registry_id}")
async def get_registry(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    return registry


@router.put("/{registry_id}/measurements")
async def update_measurements(registry_id: str, request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    payload = await request.json()
    ta = TypeAdapter(List[Measurement])
    registry.measurements = ta.validate_python(payload)
    registry.put()


@router.get("/{registry_id}/patients")
async def get_registry_patients(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    registry_treatments = registry.fetch_patients(requesting_user=user)
    return registry_treatments


class InvitePatientRequest(BaseModel):
    email: str


@router.post("/{registry_id}/invite-patient")
async def invite_patient(registry_id: str, invite: InvitePatientRequest,
                         auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    registry.invite_patient(email=invite.email, invited_by_user=user)
    return {'status': 'success'}


@router.post("/{registry_id}/refer-patient")
async def refer_patient(registry_id: str, patient_registry: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')

    registry_treatment = RegistryTreatment(
        registry_id=registry.id,
        user_id=patient_registry['mrn'],
        referring_npi=patient_registry['referring_npi'],
        mrn=patient_registry['mrn']
    )
    registry_treatment.put()


    """

    registry.invite_patient(email=patient_registry['email'], invited_by_user=user, payload={
        'registry_id': registry_id,
        'user_id': user.id,
        'mrn': patient_registry['mrn'],
        'referring_npi': patient_registry['referring_npi'],
        'payer': patient_registry['payer'],
        'first_name': patient_registry['first_name'],
        'last_name': patient_registry['last_name'],
        'phone_number': patient_registry['phone_number'],
        'email': patient_registry['email'],
        'date_of_birth': patient_registry['date_of_birth'],
    })
    """


class PatientMeasurements(BaseModel):
    measurements: List[MeasurementValue]


@router.post("/{registry_id}/patient/{patient_id}/measurement")
async def set_patient_measurement(registry_id: str, patient_id: str, payload: PatientMeasurements,
                                  auth: CognitoTokenCustom = Depends(auth_token_check)):
    for measurement in payload.measurements:
        MeasurementValue(
            user_id=patient_id,
            registry_id=registry_id,
            measure=measurement.measure,
            measurement_group_id=measurement.measurement_group_id,
            value=measurement.value
        ).put()
    return {'status': 'success'}


@router.post("/{registry_id}/patient-attribute")
async def set_patient_attribute(registry_id: str, data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_treatment = RegistryTreatment.get_by_key(RegistryTreatment, 'registry-id:%s' % registry_id,
                                                      'treatment-user-id:%s' % data['user_id'])

    # if we are setting the relapse prevention plan, we need to set the date in the registry
    if data['attr_name'] == 'status' and data['attr_value'] == 'Relapse Prevention Plan':
        current_time = int(datetime.datetime.utcnow().timestamp() * 1000)
        registry_treatment.set_attribute('relapse_prevention_plan', current_time)
    registry_treatment.set_attribute(data['attr_name'], data['attr_value'])


@router.get("/{registry_id}/measurements")
async def get_measurments_for_patient(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    measurements = registry.fetch_patient_measurement(measure='', requesting_user_id=auth.cognito_id)
    return measurements


@router.post("/{registry_id}/patient/{patient_id}/measurements")
def record_patient_measurement(registry_id: str, patient_id: str, measurement: MeasurementValue,
                               auth: CognitoTokenCustom = Depends(auth_token_check)):
    measurement.user_id = auth.cognito_id
    measurement.registry_id = registry_id
    measurement.put()


@router.get("/{registry_id}/patient/{patient_id}/measurements/{measure}")
def get_patient_measurement(registry_id: str, patient_id: str, measure: str,
                            auth: CognitoTokenCustom = Depends(auth_token_check)):
    measurements = MeasurementValue.get_by_key(MeasurementValue, 'registry-id:%s' % registry_id,
                                               'user-id:%s' % patient_id, 'measure:%s' % measure)
    return measurements
