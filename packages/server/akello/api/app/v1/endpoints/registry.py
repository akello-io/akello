from fastapi import APIRouter, Depends
from akello.db.models import UserInvite, UserRole, AkelloApp, TreatmentLog, PatientRegistry, RegistryModel
from akello.services.registry import RegistryService
from akello.services.user import UserService
from akello.services.akello_apps import AkelloAppsService
from akello.auth.provider import auth_token_check
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.services.screeners import ScreenerService
from akello.services.akello_apps import AkelloAppsService
from akello.decorators.mixin import APIMixin
from akello_apps.metriport.plugin import MetriportPlugin
from fastapi import Request
from akello.decorators.mixin import mixin
import datetime
import logging, os

logger = logging.getLogger('mangum')

metriport = MetriportPlugin()
router = APIRouter()

# Register the mixins based on enabled plugins
mixins = []


# metriport_api_key = os.getenv('METRIPORT_API_KEY', None)
# metriport_api_url = os.getenv('METRIPORT_API_URL', None)
# if metriport_api_key != '$METRIPORT_API_KEY' and metriport_api_url != '$METRIPORT_API_URL' and metriport_api_key and metriport_api_url:
# mixins.append(APIMixin(order='pre', plugin=metriport, method='start_fhir_consolidated_data_query', args=['treatment_log.patient_mrn', 'registry_id']))


@router.post("/create")
async def create_registry(data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    logger.info('creating a new registry name: %s - created by user: %s' % (data['name'], auth.username))

    # Create the registry and link the user to the registry
    questionnaires = ScreenerService.get_screeners()

    # Create the registry and link the user to the registry    
    registry_id = RegistryService.create_registry(
        data['name'],
        data['description'],
        questionnaires,
        data['integrations'],
        data['logo_url']
    )
    UserService.create_registry_user(
        registry_id, data['first_name'],
        data['last_name'],
        auth.username,
        auth.cognito_id,
        UserRole.care_manager,
        is_admin=True)
    UserService.create_user_registry(auth.cognito_id, registry_id)

    # Add additional user invites
    for invited_user in data['invited-users']:
        # TODO: This should be a service under registry
        # Create the UserInvite only if the user doesn't exist. if they do add them in
        UserInvite.create(auth.cognito_id, invited_user['email'], invited_user['role'], registry_id)

    return {'id': registry_id, 'name': data['name']}


@router.get("/{registry_id}")
async def get_registry(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    registry = RegistryService.get_registry(registry_id)
    registry['is_admin'] = registry_access['is_admin']
    registry['role'] = registry_access['role']
    return registry


@router.get("/{registry_id}/team-members")
async def get_registry_team_members(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    members = RegistryService.get_members(registry_id)
    for member in members:
        member['is_user'] = member['email'] == auth.username
    return members


@router.get("/{registry_id}/patients")
async def get_registry_patients(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    registry_metadata = RegistryService.get_registry(registry_id)
    registry_access = UserService.check_registry_access(auth.cognito_id, registry_id)
    patients = RegistryService.get_patients(registry_id)
    successfully_loaded = []
    failed_patients = []
    for patient in patients:
        try:
            successfully_loaded.append(PatientRegistry(**patient))
        except Exception as e:
            print(e)
            failed_patients.append(patient)

    return {
        'is_admin': registry_access['is_admin'],
        'role': registry_access['role'],
        'questionnaires': registry_metadata['questionnaires'],
        'successfully_loaded': successfully_loaded,
        'failed_patients': failed_patients
    }


@router.post("/{registry_id}/refer-patient")
async def refer_patient(request: Request, registry_id: str, patient_registry: PatientRegistry,
                        auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    patient_registry = PatientRegistry(
        id=registry_id,
        patient_mrn=patient_registry.patient_mrn,
        payer=patient_registry.payer,
        first_name=patient_registry.first_name,
        last_name=patient_registry.last_name,
        phone_number=patient_registry.phone_number,
        email=patient_registry.email,
        date_of_birth=patient_registry.date_of_birth,
        treatment_logs=patient_registry.treatment_logs,
        schema_version='V1',
    )
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
    registry = RegistryService.get_registry(registry_id)
    registry = RegistryModel(**registry)
    AkelloAppsService.save_akello_app(registry_id, akello_app)
