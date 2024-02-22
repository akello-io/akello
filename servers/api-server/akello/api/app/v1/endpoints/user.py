from fastapi import APIRouter, Depends
from akello.auth.provider import auth_token_check
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.dynamodb.models.user import UserInvite
from akello.services.user import UserService
from akello.services.registry import RegistryService
from akello.services.reports import ReportsService  
from datetime import datetime, timedelta

import logging

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("")
async def get_user(auth: CognitoTokenCustom = Depends(auth_token_check)):
    logger.info('calling get_user: email:%s' % auth.username)
    user = UserService.get_user(auth.cognito_id)
    if not user:
        logger.info('registering a new User for the first time - %s ' % auth.username)
        UserService.create_user(auth.cognito_id, auth.username)
    else:
        UserService.set_user_active(auth.cognito_id)

    # TODO: WE SHOULD ONLY DO THIS ONCE ON LOGIN
    invites = UserInvite.get_invites(auth.username)
    print('invites: %s ' % auth.username)
    print('invites')
    print(invites)
    for invite in invites:
        logger.info('adding user - %s to registry %s ' % (auth.username, invite['registry_id']))
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


# TODO: Should this be the root API for registry?
#     api.akello.io/registry -- this gets the list of registeries for current account which
#     they have access to
@router.get("/registries")
async def get_user_registries(auth: CognitoTokenCustom = Depends(auth_token_check)):
    registries = UserService.get_registries(auth.cognito_id)

    user_id = auth.cognito_id
    for registry in registries:
        registry_id = registry['id']        

        registry_access = UserService.check_registry_access(user_id, registry_id)
        registry['is_admin'] = registry_access['is_admin']
        registry['role'] = registry_access['role']
        registry_metadata = RegistryService.get_registry(registry_id)
        registry['members'] = RegistryService.get_members(registry_id)
        
        patients = RegistryService.get_patients(registry_id)
                
        for patient in patients:                        
            if 'patient_flag' in patient and patient['patient_flag'] == 'Safety Risk':                
                registry['safety_risk'] = True                

        # registry['members'] = registry_metadata['members']
        registry['active_patients'] = registry_metadata['active_patients']

        registry['total_minutes'] = registry_metadata['active_patients'] * 70   # 70 mins minimum per patient
        first_day_month = datetime.today().replace(day=1)   
        last_day_month = first_day_month + timedelta(days=31)        
        billing_data = ReportsService.get_billing_report(registry_id, first_day_month.timestamp(), last_day_month.timestamp() )
        registry['completed_minutes'] = sum([patient['total_minutes'] for patient in billing_data])

        # TODO: This could be a farily large object since we are returning the full FHIR Resource
        registry['questionnaires'] = registry_metadata['questionnaires']

        registry['integrations'] = registry_metadata['integrations']
        registry['logo_url'] = registry_metadata['logo_url']

        print('>>>>>>>>>>> logo url %s' % registry['logo_url'])

    return registries
