from fastapi import APIRouter, Depends
from akello.dynamodb.models.user import UserInvite, UserRole
from akello.dynamodb.models.registry import TreatmentLog
from akello.dynamodb.models.registry import RegistryModel, PatientRegistry
from akello.services.registry import RegistryService
from akello.services.user import  UserService
from akello.services.reports import ReportsService
from akello.auth_settings import cognito_us
from akello.auth_settings import CognitoTokenCustom

import logging
logger = logging.getLogger('mangum')

router = APIRouter()


@router.post("/create")
async def create_registry(data: dict, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    logger.info('creating a new registry name: %s - created by user: %s' % (data['name'], auth.email))

    # Create the registry and link the user to the registry
    registry_id = RegistryService.create_registry(data['name'], auth.cognito_id)
    UserService.create_registry_user(
        registry_id, data['first_name'], data['last_name'], auth.email, auth.cognito_id, UserRole.care_manager, is_admin=True)
    UserService.create_user_registry(auth.cognito_id, registry_id)

    # Add additional user invites
    for invited_user in data['invited-users']:
        #TODO: This should be a service under registry
        # Create the UserInvite only if the user doesn't exist. if they do add them in
        UserInvite.create(auth.cognito_id, invited_user['email'], invited_user['role'],  registry_id)

    return {'id': registry_id, 'name': data['name']}


@router.get("/{registry_id}/team-members")
async def get_registry_team_members(registry_id: str, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    members = RegistryService.get_members(registry_id)
    for member in members:
        member['is_user'] = member['email'] == auth.email
    return members

@router.get("/{registry_id}/patients")
async def get_registry_patients(registry_id: str, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    patients = RegistryService.get_patients(registry_id)
    successfully_loaded = []
    failed_patients = []
    for patient in patients:
        try:
            successfully_loaded.append(PatientRegistry(**patient))
        except Exception as e:
            failed_patients.append(patient['patient_mrn'])

    return {
        'is_admin': registry_access['is_admin'],
        'role': registry_access['role'],
        'successfully_loaded': successfully_loaded,
        'failed_patients': failed_patients
    }

@router.post("/{registry_id}/refer-patient")
async def refer_patient(registry_id: str, model: PatientRegistry,
                                  auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    logger.info('referring a patient MRN:%s into registry %s - created by user: %s' % (model.patient_mrn, registry_id, auth.cognito_id) )
    UserService.check_registry_access(auth.cognito_id, registry_id)
    patient_registry = PatientRegistry(
        id=registry_id,
        patient_mrn=model.patient_mrn,
        payer=model.payer,
        first_name=model.first_name,
        last_name=model.last_name,
        phone_number=model.phone_number,
        email=model.email,
        date_of_birth=model.date_of_birth,
        treatment_logs=model.treatment_logs,
        schema_version='V1',
    )
    RegistryService.refer_patient(patient_registry)
    RegistryService.update_stats(registry_id)

    return patient_registry


@router.post("/{registry_id}/record-session")
async def record_session(registry_id: str, treatment_log: TreatmentLog, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    logger.info('recording session on registry: %s for patient MRN: %s by user %s' % (registry_id, treatment_log.patient_mrn, auth.email))
    UserService.check_registry_access(auth.cognito_id, registry_id)
    RegistryService.add_treatment_log(registry_id, treatment_log.patient_mrn, treatment_log)
    return treatment_log


@router.post("/{registry_id}/patient-attribute")
async def set_patient_attribute(registry_id: str, data: dict, auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    logger.info('registry: %s setting patient MRN: %s attribute name: %s to value: %s' % (registry_id, data['mrn'], data['attr_name'], data['attr_value']))

    #TODO: static methods are not that helpful when you have to set the partition key
    PatientRegistry.set_attribute('registry-patient:%s' % registry_id, data['mrn'], data['attr_name'], data['attr_value'])
