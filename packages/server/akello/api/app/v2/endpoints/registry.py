from fastapi import APIRouter, Depends
from akello.services.models.registry import RegistryService
from akello.services.models.user import UserService
from akello.auth.provider import auth_token_check
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.services.models.stripe_payment import StripePaymentService
# from akello_apps.metriport.plugin import MetriportPlugin
from fastapi import Request
from akello.decorators.mixin import mixin
import logging, os
import stripe

logger = logging.getLogger('mangum')

# metriport = MetriportPlugin()
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



@router.post("/{registry_id}/patient-attribute")
async def set_patient_attribute(registry_id: str, data: dict, auth: CognitoTokenCustom = Depends(auth_token_check)):
    pass



