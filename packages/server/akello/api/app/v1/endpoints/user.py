import logging
import os
import uuid
from typing import Optional

import boto3
from boto3 import Session
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check
from akello.db.models_v2.user import User, UserSession
from akello.services.models.user import UserService

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("")
async def get_user(request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    # log session
    UserSession(
        user_id=auth.cognito_id,
        session_id=str(uuid.uuid4()),
        user_agent=request.headers['user-agent'],
        ip_address=request.client.host
    ).put()

    logger.info('calling get_user: email:%s' % auth.username)

    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    if not user:
        # if this is the first time we are seeing the user we create a new user
        logger.info('registering a new User for the first time - %s ' % auth.username)
        user = User(id=auth.cognito_id, first_name=auth.given_name, last_name=auth.family_name, email=auth.username)
        user.put()
    return user


@router.get("/sessions")
async def get_user_sessions(auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
    return user.fetch_user_sessions()


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
