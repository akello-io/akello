from fastapi import APIRouter, Depends
from akello.auth_settings import cognito_us
from akello.auth_settings import CognitoTokenCustom
from akello.dynamodb.models.user import UserInvite, RegistryUser
from akello.services.user import UserService
from akello.services.registry import RegistryService

import logging
logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("")
async def get_user(auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    logger.info('calling get_user: email:%s' % auth.email)
    user = UserService.get_user(auth.cognito_id)
    if not user:
        logger.info('registering a new User for the first time - %s ' % auth.email)
        UserService.create_user(auth.cognito_id, auth.email)
    else:
        UserService.set_user_active(auth.cognito_id)

    # TODO: WE SHOULD ONLY DO THIS ONCE ON LOGIN
    invites = UserInvite.get_invites(auth.email)
    print('invites: %s ' % auth.email)
    print('invites')
    print(invites)
    for invite in invites:
        logger.info('adding user - %s to registry %s ' % (auth.email, invite['registry_id']))
        UserService.create_registry_user(
            registry_id=invite['registry_id'],
            first_name='',
            last_name='',
            email=invite['email'],
            user_id=auth.cognito_id,
            role=invite['role'],
            is_admin=False
        )
        UserService.create_user_registry(auth.cognito_id, invite['registry_id'])
        RegistryService.update_stats(invite['registry_id'])


#TODO: Should this be the root API for registry?
#     api.akello.io/registry -- this gets the list of registeries for current account which
#     they have access to
@router.get("/registries")
async def get_user_registries(auth: CognitoTokenCustom = Depends(cognito_us.auth_required)):
    registries = UserService.get_registries(auth.cognito_id)

    user_id = auth.cognito_id
    for registry in registries:
        registry_id = registry['id']
        registry_access = UserService.check_registry_access(user_id, registry_id)
        registry['is_admin'] = registry_access['is_admin']
        registry['role'] = registry_access['role']
        registry['role'] = registry_access['role']

        registry_metadata = RegistryService.get_registry(registry_id)

        registry['members'] = registry_metadata['members']
        registry['active_patients'] = registry_metadata['active_patients']

    return registries
