import logging
import os
import uuid

from fastapi import APIRouter, Request, Depends

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check
from akello.db.models_v2.user import User, UserSession

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("")
async def get_user(request: Request, auth: CognitoTokenCustom = Depends(auth_token_check)):
    UserSession(
        user_id=auth.cognito_id,
        session_id=str(uuid.uuid4()),
        user_agent=request.headers['user-agent'],
        ip_address=request.client.host
    ).put()
    logger.info('calling get_user: email:%s' % auth.username)
    user = User.get_by_key(User, auth.cognito_id, 'meta')

    if not user:
        logger.info('registering a new User for the first time - %s ' % auth.username)
        user = User(id=auth.cognito_id,first_name=auth.given_name,last_name=auth.family_name,email=auth.username)
        user.put()

    return user


@router.get("/sessions")
async def get_user_sessions(auth: CognitoTokenCustom = Depends(auth_token_check)):
    raise Exception('Not implemented')

