from fastapi import APIRouter, Depends
from akello.db.models import UserRole, AkelloApp, TreatmentLog, PatientRegistry, RegistryModel
from akello.db.types import UserInvite
from akello.services.registry import RegistryService
from akello.services.user import UserService
from akello.auth.provider import auth_token_check
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.services.screeners import ScreenerService
from akello.services.akello_apps import AkelloAppsService
from akello.decorators.akello_plan_tier import akello_plan_check
from akello.services.stripe_payment import StripePaymentService
#from akello_apps.metriport.plugin import MetriportPlugin
from fastapi import Request
from akello.decorators.mixin import mixin
import datetime
import logging, os
import stripe

logger = logging.getLogger('mangum')

#metriport = MetriportPlugin()
router = APIRouter()

# Register the mixins based on enabled plugins
mixins = []



stripe.api_key = os.getenv('STRIPE_API_KEY', None)


# metriport_api_key = os.getenv('METRIPORT_API_KEY', None)
# metriport_api_url = os.getenv('METRIPORT_API_URL', None)
# if metriport_api_key != '$METRIPORT_API_KEY' and metriport_api_url != '$METRIPORT_API_URL' and metriport_api_key and metriport_api_url:
# mixins.append(APIMixin(order='pre', plugin=metriport, method='start_fhir_consolidated_data_query', args=['treatment_log.patient_mrn', 'registry_id']))


@router.post("/{registry_id}/payment/{stripe_session_id}", include_in_schema=False)
async def payment_confirmed(stripe_session_id: str):
    item = stripe.checkout.Session.retrieve(stripe_session_id)
    registry_id = item['client_reference_id']
    stripe_customer_id = item['customer']
    RegistryService.set_stripe_customer_id(registry_id, stripe_customer_id)


@router.get("/{registry_id}/subscription")
async def check_active_subscription(registry_id: str):
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

@router.post("/create")
async def create_registry(data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    Creates a new registry with the specified details and links the creating user as an admin.

    This endpoint creates a registry using information provided in the `data` parameter. It initializes the registry with a set of questionnaires (screeners), sets up integration details, and links the creating user as a care manager and admin. Additional users can be invited to the registry as specified in the `data['invited-users']` list.

    Parameters:
    - data (dict): A dictionary containing the registry's details. Expected keys are:
        - 'name': The name of the registry.
        - 'description': A brief description of the registry.
        - 'integrations': Integration details for the registry.
        - 'logo_url': URL to the registry's logo.
        - 'first_name': The first name of the creating user.
        - 'last_name': The last name of the creating user.
        - 'invited-users': A list of dictionaries, each containing 'email' and 'role' keys for additional users to invite.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token contains user information such as username and cognito_id.

    Returns:
    - dict: A dictionary with the created registry's ID and name.

    The method logs the creation process, creates the registry, associates the creating user with it, invites additional users, and returns the registry's ID and name.
    """
    logger.info('creating a new registry name: %s - created by user: %s' % (data['name'], auth.username))

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
        UserInvite.create(auth.cognito_id, invited_user['email'], invited_user['role'], registry_id)

    return {'id': registry_id, 'name': data['name']}


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
    """
    Updates the measurements for a specified registry based on the provided JSON payload.

    This endpoint allows for the updating of measurement data associated with a specific registry. It checks if the user has access to the registry and then updates the registry's measurements with the new data provided in the request body.

    Parameters:
    - registry_id (str): The unique identifier of the registry whose measurements are to be updated.
    - request (Request): The request object, which includes the JSON payload with the measurement data to update. The expected structure of the payload is specific to the registry's requirements for measurements.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token is used to verify that the user has the necessary permissions to update measurements for the specified registry.

    The function does not explicitly return a value. Upon successful update, it may implicitly return a successful HTTP status code, such as 200 OK, depending on the framework's behavior.
    """
    UserService.check_registry_access(auth.cognito_id, registry_id)
    payload = await request.json()
    RegistryService.set_measurements(registry_id, payload)

@router.get("/{registry_id}/team-members")
async def get_registry_team_members(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    Retrieves a list of team members associated with a specific registry, including information on whether the current user is a member.

    This endpoint fetches and returns the list of all team members within a given registry. It checks if the authenticated user has access to the specified registry and, for each team member retrieved, adds a flag to indicate whether the team member is the user making the request based on their email address.

    Parameters:
    - registry_id (str): The unique identifier of the registry from which to retrieve team members.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token contains the user's information such as username (email) and cognito_id, which is used for access verification and to identify if the user is part of the team members.

    Returns:
    - list: A list of dictionaries, each representing a team member. Each dictionary includes the team member's details and an 'is_user' flag indicating if this member is the user making the request.

    The function ensures that only authorized users can fetch team member information and dynamically adjusts the returned information based on the requester's identity.
    """
    UserService.check_registry_access(auth.cognito_id, registry_id)
    members = RegistryService.get_members(registry_id)
    for member in members:
        member['is_user'] = member['email'] == auth.username
    return members



@router.get("/{registry_id}/patients")
async def get_registry_patients(registry_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    Retrieves detailed information about patients within a specified registry, including their questionnaire data, and categorizes them into successfully loaded and failed patients based on data integrity.

    This function first verifies the requesting user's access rights to the registry. It then fetches a list of all patients associated with the given registry and attempts to construct patient objects. Patients whose data complies with the expected schema are added to the 'successfully_loaded' list, while those with schema mismatches or missing data are listed under 'failed_patients'. Additionally, the function returns the user's role and admin status in the registry, along with a list of questionnaires associated with the registry.

    Parameters:
    - registry_id (str): The unique identifier of the registry whose patients are being queried.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token includes the user's identification and authorization information to verify access to the registry.

    Returns:
    - dict: A dictionary containing:
        - 'is_admin' (bool): Whether the requesting user has admin rights in the registry.
        - 'role' (str): The user's role within the registry.
        - 'questionnaires' (list): A list of questionnaires associated with the registry.
        - 'successfully_loaded' (list): A list of patient objects that were successfully loaded.
        - 'failed_patients' (list): A list of patient data that failed to load due to errors.

    This endpoint is crucial for managing patient data integrity and ensuring that registry administrators have a clear overview of data loading issues.
    """
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
    """
    Creates a new patient referral in the specified registry, updating registry statistics upon successful referral.

    This endpoint allows for the referral of a new patient to a specified registry. It ensures that the user making the request has access to the given registry and then creates a new patient entry based on the provided patient details. The patient data includes personal information, medical record number (MRN), payer details, and the referring provider's NPI, among others. Once the patient is successfully referred, the function updates the registry's statistics to reflect the new entry.

    Parameters:
    - request (Request): The request object, which may contain additional data or metadata about the request; not directly used in this function.
    - registry_id (str): The unique identifier of the registry to which the patient is being referred.
    - patient_registry (PatientRegistry): An object representing the patient to be referred, containing all necessary patient information such as MRN, payer information, referring provider's NPI, personal information (first name, last name, phone number, email, date of birth), and any treatment logs.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token is used to verify that the user has the necessary permissions to refer a patient to the specified registry.

    Returns:
    - PatientRegistry: The patient registry object that was created and saved to the database, including the generated ID and the schema version set to 'V1'.

    The function not only creates a new patient referral but also ensures that the process adheres to the access controls associated with the registry and updates the registry's statistical data to maintain accurate and current records.
    """
    UserService.check_registry_access(auth.cognito_id, registry_id)
    patient_registry = PatientRegistry(
        id=registry_id,
        patient_mrn=patient_registry.patient_mrn,
        payer=patient_registry.payer,
        referring_provider_npi=patient_registry.referring_provider_npi,
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
    """
    Records a treatment session for a patient within a specific registry by adding a treatment log entry.

    This endpoint facilitates the recording of a patient's treatment session by adding a new treatment log entry to the specified registry. It verifies the requesting user's access to the registry and then appends the provided treatment log, which contains detailed information about the patient's session, to the registry's treatment log entries. The treatment log includes, but is not limited to, the patient's medical record number (MRN) and the specifics of the treatment session.

    Parameters:
    - request (Request): The request object, containing data about the incoming HTTP request. This parameter is currently unused in the function body but is required for endpoint operation.
    - registry_id (str): The identifier of the registry to which the treatment session will be recorded.
    - treatment_log (TreatmentLog): An object representing the treatment session to be recorded, containing all necessary information such as the patient's MRN and details of the treatment session.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token is used to ensure that the user has authorized access to add a treatment log to the specified registry.

    Returns:
    - TreatmentLog: The treatment log object that was added, indicating successful recording of the treatment session.

    The function aims to seamlessly integrate treatment session recording into patient management within registries, ensuring data integrity and authorized access.
    """
    UserService.check_registry_access(auth.cognito_id, registry_id)
    RegistryService.add_treatment_log(registry_id, treatment_log.patient_mrn, treatment_log)
    return treatment_log


@router.post("/{registry_id}/patient-attribute")
async def set_patient_attribute(registry_id: str, data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    Updates or sets a specific attribute for a patient within a given registry. This can include changing the patient's status or other key attributes.

    This endpoint allows for the modification of patient attributes within a registry based on the provided attribute name and value in the request data. If the attribute being set is the patient's status to 'Relapse Prevention Plan', the method also records the current timestamp as the date for the plan. The function checks the user's access to the specified registry before proceeding with the update.

    Parameters:
    - registry_id (str): The identifier of the registry containing the patient whose attribute is to be updated.
    - data (dict): A dictionary containing the key-value pairs necessary for the attribute update. Expected keys include:
        - 'mrn' (str): The medical record number of the patient.
        - 'attr_name' (str): The name of the attribute to be updated (e.g., 'status').
        - 'attr_value' (str or int): The new value for the specified attribute. If updating to a 'Relapse Prevention Plan', this should be set accordingly.
    - auth (CognitoTokenCustom): An authentication token, obtained through dependency injection with `auth_token_check`, to verify the user's authorization to make changes.

    The method does not return a value but updates the patient's record in the database. If a specified attribute affects key treatment or patient management processes (like 'Relapse Prevention Plan'), additional steps are taken to ensure the update is accurately reflected in the patient's record.

    It's important to handle this method's execution with care due to its potential impact on patient management and treatment plans.
    """
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
    """
    Retrieves the application configuration settings for a specified registry.

    This endpoint fetches and returns a list of application configuration settings associated with the given registry. It ensures that the user requesting the configurations has the necessary access rights to the registry. The configurations returned can include a variety of settings that dictate how applications within the registry should behave or be displayed to the users.

    Parameters:
    - registry_id (str): The identifier of the registry whose application configurations are being requested.
    - auth (CognitoTokenCustom): An authentication token for the user, provided by the `auth_token_check` dependency. This token is used to verify that the user has authorized access to view the application configurations of the specified registry.

    Returns:
    - list: A list of application configurations for the registry. Each item in the list represents a different configuration setting that applications within the registry might use.

    This function is essential for managing and customizing the user experience within specific registries by providing the necessary configuration settings that applications need to operate correctly or according to the registry's requirements.
    """
    UserService.check_registry_access(auth.cognito_id, registry_id)
    app_configs = AkelloAppsService.get_app_configs(registry_id)
    return [app for app in app_configs]


@router.post("/{registry_id}/app-configs/{app_id}/save")
async def save_akello_app(registry_id: str, akello_app: AkelloApp,
                          auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.check_registry_access(auth.cognito_id, registry_id)
    AkelloAppsService.save_akello_app(registry_id, akello_app)
