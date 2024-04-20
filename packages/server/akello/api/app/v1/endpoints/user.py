import logging
import os
import uuid

from fastapi import APIRouter, Request, Depends

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check
from akello.db.models.organization import Organization
from akello.db.models.user import User, UserSession

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("")
async def get_user(request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    This should only be called when the user logs in. It will create a new user if the user does not exist
    """

    created_user = False

    # log session
    UserSession(
        user_id=auth.cognito_id,
        session_id=str(uuid.uuid4()),
        user_agent=request.headers['user-agent'],
        ip_address=request.client.host
    ).put()

    logger.info('calling get_user: email:%s' % auth.username)

    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')

    def _create_organization_registry(user):
        _organization = Organization(
            id=str(uuid.uuid4()),
            created_by=user
        )
        _organization.create(requesting_user=user)
        return _organization.create_registry(name=None, logo=None, requesting_user=user)

    if not user:
        # if this is the first time we are seeing the user we create a new user
        logger.info('registering a new User for the first time - %s ' % auth.username)
        given_name = auth.given_name if hasattr(auth, 'given_name') else None
        family_name = auth.family_name if hasattr(auth, 'family_name') else None
        username = auth.username if hasattr(auth, 'username') else None

        user = User(id=auth.cognito_id, first_name=given_name, last_name=family_name, email=username)
        user.put()
        created_user = True
        selected_registry = _create_organization_registry(user)
    else:
        user_organizations = user.fetch_user_organizations()
        if len(user_organizations) == 0:
            raise Exception('User does not have any organizations')

        # Currently we select the first organization since we don't support multi organization yet
        user_organization = user_organizations[0]
        organization = Organization.get_by_key(Organization, 'organization-id:%s' % user_organization.organization_id,
                                               'meta')
        registries = organization.fetch_organization_registries(requesting_user=user)

        # Currently we select the first registry since we don't support multi registry yet
        if len(registries) == 0:
            raise Exception('Organization does not have any registries')
        selected_registry = registries[0]

    return {
        'user': user,
        'created_user': created_user,
        'selected_registry': selected_registry
    }


@router.get("/invites")
async def get_user_invites(auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    return user.fetch_invites()


@router.get("/organizations")
async def get_user_organizations(auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    return user.fetch_user_organizations()


@router.get("/sessions")
async def get_user_sessions(auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    return user.fetch_user_sessions()


@router.get("/organizations")
async def get_user_organizations(auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    return user.fetch_user_organizations()


@router.get("/registries")
async def get_user_registries(auth: CognitoTokenCustom = Depends(auth_token_check)):
    # return UserService.get_registries(auth.cognito_id)
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    return user.fetch_registries()


"""
TODO: This is a work in progress. The idea is to allow users to set their MFA settings

class MFASettingType(BaseModel):
    Enabled: bool
    PreferredMfa: bool


class MFASetting(BaseModel):
    SMSMfaSettings: Optional[MFASettingType] = None
    SoftwareTokenMfaSettings: Optional[MFASettingType] = None
    Username: str
    UserPoolId: str


@router.post("/set-mfa")
async def set_user_mfa(mfa_setting: MFASetting, auth: CognitoTokenCustom = Depends(auth_token_check)):
    # TODO: Make sure only the user can set their own MFA
    assert auth.email == mfa_setting.Username
    if not AKELLO_DYNAMODB_LOCAL_URL:
        response = boto3.client('cognito-idp').admin_set_user_mfa_preference(
            **mfa_setting.model_dump(exclude_none=True))
    else:
        response = Session(profile_name='Dev').client('cognito-idp').admin_set_user_mfa_preference(
            **mfa_setting.model_dump(exclude_none=True))
    assert response['ResponseMetadata']['HTTPStatusCode'] == 200
"""
