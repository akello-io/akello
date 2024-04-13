import logging
import os
import boto3
from fastapi import APIRouter, Request, Depends, UploadFile
from akello.auth.provider import auth_token_check
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.db.types import UserInvite
from akello.services.user import UserService
from akello.services.registry import RegistryService
from akello.db.connector.s3 import S3Storage
from pydantic import BaseModel
from typing import Optional
from boto3 import Session

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')

logger = logging.getLogger('mangum')
router = APIRouter()


@router.post("/profile_photo")
async def update_profile_photo(file: UploadFile, auth: CognitoTokenCustom = Depends(auth_token_check)):
    file_path = await S3Storage().set_item(file.filename, file)
    return file_path


@router.get("")
async def get_user(request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserService.save_user_session(auth.cognito_id, request.headers['user-agent'], request.client.host)
    logger.info('calling get_user: email:%s' % auth.username)
    user = UserService.get_user(auth.cognito_id)
    if not user:
        logger.info('registering a new User for the first time - %s ' % auth.username)
        UserService.create_user(auth.cognito_id, auth.username, auth.given_name, auth.family_name,
                                None)  # raise Exception('User not found')
    else:
        UserService.set_user_active(auth.cognito_id)

    # TODO: WE SHOULD ONLY DO THIS ONCE ON LOGIN

    invites = UserInvite.get_invites(auth.username)
    print('invites: %s ' % auth.username)
    print('invites')
    print(invites)
    for invite in invites:
        logger.info('adding user - %s to registry %s ' % (auth.username, invite['registry_id']))
        UserService.create_registry_user(registry_id=invite['registry_id'], first_name='Vijay',
            # TODO: Remove hardcoded value
            last_name='Selvaraj',  # TODO: Remove hardcoded value
            email=invite['email'], user_id=auth.cognito_id, role=invite['role'], is_admin=False)
        UserService.link_user_to_registry(auth.cognito_id, invite['registry_id'])
        RegistryService.update_stats(invite['registry_id'])

    return user


@router.get("/sessions")
async def get_user_sessions(auth: CognitoTokenCustom = Depends(auth_token_check)):
    return UserService.get_user_sessions(auth.cognito_id)


# TODO: Should this be the root API for registry?
#     api.akello.io/registry -- this gets the list of registeries for current account which
#     they have access to
@router.get("/registries")
async def get_user_registries(auth: CognitoTokenCustom = Depends(auth_token_check)):
    return UserService.get_registries(auth.cognito_id)


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
