import logging
from fastapi import APIRouter, Depends
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check
from akello.db.models_v2.registry_treatment import RegistryTreatment
from akello.db.models_v2.types import PatientStatus


import boto3, os
from boto3 import Session

from fastapi import Request
from akello.db.models_v2.user import User, UserInvite, UserRegistryRole

logger = logging.getLogger('mangum')
router = APIRouter()

client = boto3.client('cognito-idp')

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')
AWS_COGNITO_USERPOOL_ID = os.getenv('AWS_COGNITO_USERPOOL_ID')

@router.get("")
async def get_patient(auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    This should only be called when the user logs in. It will create a new user if the user does not exist
    """
    patient = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')

    if not patient:
        given_name = auth.given_name if hasattr(auth, 'given_name') else None
        family_name = auth.family_name if hasattr(auth, 'family_name') else None
        username = auth.username if hasattr(auth, 'username') else None
        patient = User(id=auth.cognito_id, first_name=given_name, last_name=family_name, email=username)
        patient.put()

    return patient


@router.get("/invites")
async def invites(auth: CognitoTokenCustom = Depends(auth_token_check)):
    user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')

    if not AKELLO_DYNAMODB_LOCAL_URL:
        response = boto3.client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,Username=auth.username)
    else:
        response = Session(profile_name='Dev').client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,Username=auth.username)

    email = None
    for attribute in response['UserAttributes']:
        if attribute['Name'] == 'email':
            email = attribute['Value']
            break

    if not email:
        raise Exception('Email not found in the user attributes')

    user_invites = user.fetch_invites(requesting_email=email)
    return [invite.to_scrubbed() for invite in user_invites if not invite.accepted]

@router.put("/invites/accept")
async def accept_invite(user_invite: UserInvite,  auth: CognitoTokenCustom = Depends(auth_token_check)):
    user_invite = UserInvite.get_by_key(UserInvite, 'user-email:%s' % user_invite.user_email,
                                        'user-invite::%s-id:%s' % (user_invite.object_type, user_invite.object_id))


    if not AKELLO_DYNAMODB_LOCAL_URL:
        response = boto3.client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,
                                                              Username=auth.username)
    else:
        response = Session(profile_name='Dev').client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,
                                                                                    Username=auth.username)

    email = None
    for attribute in response['UserAttributes']:
        if attribute['Name'] == 'email':
            email = attribute['Value']
            break

    assert user_invite.user_email == email, 'Email does not match the invite'


    user_invite.accepted = True

    if user_invite.role == UserRegistryRole.patient:
        # Add the patient to the registry in a 'accepted' state
        user = User.get_by_key(User, 'user-id:%s' % auth.cognito_id, 'meta')
        RegistryTreatment(
            registry_id=user_invite.payload['registry_id'],
            user_id=user.id,
            mrn=user_invite.payload['mrn'],
            referring_npi=user_invite.payload['referring_npi'],
            payer=user_invite.payload['payer'],
            status=PatientStatus.accepted,
            first_name=user_invite.payload['first_name'],
            last_name=user_invite.payload['last_name'],
            phone_number=user_invite.payload['phone_number'],
            email=user_invite.payload['email'],
            date_of_birth=user_invite.payload['date_of_birth']
        )._AkelloBaseModel__put()

    user_invite._AkelloBaseModel__put()
    return {
        'status': 'success',
        'message': 'Invite accepted'
    }


@router.put("/invites/decline")
async def decline_invite(user_invite: UserInvite,  auth: CognitoTokenCustom = Depends(auth_token_check)):
    if not AKELLO_DYNAMODB_LOCAL_URL:
        response = boto3.client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,
                                                              Username=auth.username)
    else:
        response = Session(profile_name='Dev').client('cognito-idp').admin_get_user(UserPoolId=AWS_COGNITO_USERPOOL_ID,
                                                                                    Username=auth.username)

    user_email = None
    for attribute in response['UserAttributes']:
        if attribute['Name'] == 'email':
            user_email = attribute['Value']
            break

    assert user_invite.user_email == user_email, 'Email does not match the invite'
    user_invite.accepted = False
    user_invite._AkelloBaseModel__put()

    return {
        'status': 'success',
        'message': 'Invite declined'
    }


