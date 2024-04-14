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
from akello.db.models_old import AkelloApp, TreatmentLog, PatientRegistry
from akello.decorators.mixin import mixin
from akello.services.models.akello_apps import AkelloAppsService
from akello.services.models.registry import RegistryService
from akello.services.models.user import UserService

from akello.db.models_v2.registry import Registry
from akello.db.models_v2.user import User

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
    """
    Retrieves the details of a specific registry by its ID, along with the access role of the requesting user.

    This method checks if the user, identified by the `auth` parameter, has access to the specified registry and then retrieves the registry's details. It augments the registry details with information about the user's role and whether they are an admin in the context of this registry.

    Parameters:
    - registry_id (str): The unique identifier of the registry to retrieve.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token contains user information such as the cognito_id.

    Returns:
    - dict: A dictionary containing the registry's details, including 'is_admin' and 'role' fields indicating the user's access level and role within the registry.

    The method first checks the user's access to the registry. If access is granted, it fetches the registry's details from the `RegistryService` and appends information about the user's role and admin status before returning this data.
    """
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    registry = RegistryService.get_registry(registry_id)
    registry['is_admin'] = registry_access['is_admin']
    registry['role'] = registry_access['role']
    return registry


@router.put("/{registry_id}/measurements")
async def update_measurements(registry_id: str, request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    payload = await request.json()
    RegistryService.set_measurements(registry_id, payload)


@router.get("/{registry_id}/team-members")
async def get_registry_team_members(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    members = RegistryService.get_members(registry_id)
    for member in members:
        member['is_user'] = member['email'] == auth.username
    return members


@router.get("/{registry_id}/patients")
async def get_registry_patients(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    patients = RegistryService.get_patients(registry_id)
    registry_metadata = RegistryService.get_registry(registry_id)
    successfully_loaded = []
    failed_patients = []
    for patient in patients:
        try:
            successfully_loaded.append(PatientRegistry(**patient))
        except Exception as e:
            print(e)
            failed_patients.append(patient)

    return {'is_admin': registry_access['is_admin'], 'role': registry_access['role'],
            'questionnaires': registry_metadata['questionnaires'], 'successfully_loaded': successfully_loaded,
            'failed_patients': failed_patients}


class InvitePatientRequest(BaseModel):
    email: str

@router.post("/{registry_id}/invite-patient")
async def invite_patient(registry_id: str, invite: InvitePatientRequest, auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    registry = Registry.get_by_key(Registry, 'registry-id:%s' % registry_id, 'meta')
    registry.invite_patient(email=invite.email, invited_by_user=user)
    return {'status': 'success'}

@router.post("/{registry_id}/refer-patient")
async def refer_patient(request: Request, registry_id: str, patient_registry: PatientRegistry,
                        auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    patient_registry = PatientRegistry(id=registry_id, patient_mrn=patient_registry.patient_mrn,
                                       payer=patient_registry.payer,
                                       referring_provider_npi=patient_registry.referring_provider_npi,
                                       first_name=patient_registry.first_name, last_name=patient_registry.last_name,
                                       phone_number=patient_registry.phone_number, email=patient_registry.email,
                                       date_of_birth=patient_registry.date_of_birth,
                                       treatment_logs=patient_registry.treatment_logs,
                                       schema_version='V1', )
    RegistryService.refer_patient(patient_registry)
    RegistryService.update_stats(registry_id)
    return patient_registry


@router.post("/{registry_id}/record-session")
@mixin(mixins=mixins)
async def record_session(request: Request, registry_id: str, treatment_log: TreatmentLog,
                         auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    RegistryService.add_treatment_log(registry_id, treatment_log.patient_mrn, treatment_log)
    return treatment_log


@router.post("/{registry_id}/patient-attribute")
async def set_patient_attribute(registry_id: str, data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)

    # if we are setting the relapse prevention plan, we need to set the date in the registry
    if data['attr_name'] == 'status' and data['attr_value'] == 'Relapse Prevention Plan':
        current_time = int(datetime.datetime.utcnow().timestamp() * 1000)
        PatientRegistry.set_attribute('registry-patient:%s' % registry_id, data['mrn'], 'relapse_prevention_plan',
                                      current_time)

    PatientRegistry.set_attribute('registry-patient:%s' % registry_id, data['mrn'], data['attr_name'],
                                  data['attr_value'])


@router.get("/{registry_id}/app-configs")
async def get_app_configs(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    app_configs = AkelloAppsService.get_app_configs(registry_id)
    return [app for app in app_configs]


@router.post("/{registry_id}/app-configs/{app_id}/save")
async def save_akello_app(registry_id: str, akello_app: AkelloApp,
                          auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    AkelloAppsService.save_akello_app(registry_id, akello_app)
