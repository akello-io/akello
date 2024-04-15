import logging
from fastapi import APIRouter, Depends
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check

import boto3, os
from boto3 import Session

from fastapi import Request
from akello.db.models_v2.user import User

logger = logging.getLogger('mangum')
router = APIRouter()

client = boto3.client('cognito-idp')

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
AWS_COGNITO_USERPOOL_ID = os.getenv('AWS_COGNITO_USERPOOL_ID')

@router.get("/invites")
async def invites(req: Request,  auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')

    if not AKELLO_DYNAMODB_LOCAL_URL:
        response = boto3.client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,Username=auth.username)
    else:
        response = Session(profile_name='Dev').client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,Username=auth.username)

    given_name = response['UserAttributes'][3]['Value']
    family_name = response['UserAttributes'][4]['Value']
    email = response['UserAttributes'][5]['Value']
    picture = response['UserAttributes'][6]['Value']

    return user.fetch_invites(requesting_email=email)