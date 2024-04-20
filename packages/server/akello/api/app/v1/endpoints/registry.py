import datetime
import logging
import os
import uuid

import stripe
from fastapi import APIRouter, Depends
from fastapi import Request

from pydantic import BaseModel

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check

from akello.services.models.registry import RegistryService
from akello.services.models.user import UserService

from akello.db.models_v2.types import Measurement

from akello.db.models_v2.registry import Registry, RegistryUser, RegistryTreatment
from akello.db.models_v2.user import User, UserRegistry, UserRegistryRole

from akello.db.models_v2.measurementvalue import MeasurementValue

from typing import List

from decimal import Decimal

from pydantic import TypeAdapter


logger = logging.getLogger('mangum')

router = APIRouter()

# Register the mixins based on enabled plugins
mixins = []

stripe.api_key = os.getenv('STRIPE_API_KEY', None)


@router.post("/{registry_id}/payment/{stripe_session_id}", include_in_schema=False)
async def payment_confirmed(stripe_session_id: str):
    item = stripe.checkout.Session.retrieve(stripe_session_id)
    registry_id = item['client_reference_id']
    stripe_customer_id = item['customer']
    RegistryService.set_stripe_customer_id(registry_id, stripe_customer_id)


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
    # TODO: Refactor this to use the new models
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry_id, 'user-id:%s' % user.id)
    if not registry_user:
        raise Exception('User does not have access to this registry')
    return registry


@router.put("/{registry_id}/measurements")
async def update_measurements(registry_id: str, request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    payload = await request.json()
    ta = TypeAdapter(List[Measurement])
    registry.measurements = ta.validate_python(payload)
    registry._AkelloBaseModel__put()

@router.get("/{registry_id}/team-members")
async def get_registry_team_members(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    # TODO: Refactor this to use the new models
    UserService.check_registry_access(auth.cognito_id, registry_id)
    members = RegistryService.get_members(registry_id)
    for member in members:
        member['is_user'] = member['email'] == auth.username
    return members


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
    registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry.id, 'user-id:%s' % user.id)
    if not registry_user:
        raise Exception('User does not have access to this registry')

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



class PatientMeasurements(BaseModel):
    measurements: List[MeasurementValue]

@router.post("/{registry_id}/patient/{patient_id}/measurement")
async def set_patient_measurement(registry_id: str, patient_id: str, payload: PatientMeasurements,
                                  auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry.id, 'user-id:%s' % user.id)
    if not registry_user:
        raise Exception('User does not have access to this registry')

    for measurement in payload.measurements:
        MeasurementValue(
            user_id=user.id,
            registry_id=registry_id,
            measure=measurement.measure,
            measurement_group_id=measurement.measurement_group_id,
            value=measurement.value
        ).put()
    return {'status': 'success'}


@router.post("/{registry_id}/patient-attribute")
async def set_patient_attribute(registry_id: str, data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry.id, 'user-id:%s' % user.id)
    if not registry_user:
        raise Exception('User does not have access to this registry')

    registry_treatment = RegistryTreatment.get_by_key(RegistryTreatment, 'registry-id:%s' % registry_id, 'treatment-user-id:%s' % data['user_id'])

    # if we are setting the relapse prevention plan, we need to set the date in the registry
    if data['attr_name'] == 'status' and data['attr_value'] == 'Relapse Prevention Plan':
        current_time = int(datetime.datetime.utcnow().timestamp() * 1000)
        registry_treatment._AkelloBaseModel__set_attribute('relapse_prevention_plan', current_time)
    registry_treatment._AkelloBaseModel__set_attribute(data['attr_name'], data['attr_value'])




@router.get("/{registry_id}/measurements")
async def get_measurments_for_patient(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    measurements = registry.fetch_patient_measurement(measure='', requesting_user_id=auth.cognito_id)
    return measurements


@router.post("/{registry_id}/patient/{patient_id}/measurements")
def record_patient_measurement(registry_id: str, patient_id: str, measurement: MeasurementValue,
                               auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry_user = RegistryUser.get_by_key(RegistryUser, 'registry-id:%s' % registry_id, 'user-id:%s' % user.id)
    if not registry_user:
        raise Exception('User does not have access to this registry')

    measurement.user_id = user.id
    measurement.registry_id = registry_id


@router.get("/{registry_id}/patient/{patient_id}/measurements/{measure}")
def get_patient_measurement(registry_id: str, patient_id: str, measure: str,
                            auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    user_registry = UserRegistry.get_by_key(UserRegistry, 'user-id:%s' % user.id, 'registry-id:%s' % registry_id)
    if not user_registry and user_registry.role == UserRegistryRole.admin:
        raise Exception('User does not have access to this registry')

    measurements = MeasurementValue.get_by_key(MeasurementValue, 'registry-id:%s' % registry_id, 'user-id:%s' % patient_id, 'measure:%s' % measure)
    return measurements