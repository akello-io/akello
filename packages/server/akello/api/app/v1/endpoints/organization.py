import logging
import os

from fastapi import APIRouter, Depends

from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom
from akello.auth.provider import auth_token_check
from akello.db.models.organization import Organization

AKELLO_DYNAMODB_LOCAL_URL = os.getenv('AKELLO_DYNAMODB_LOCAL_URL')

logger = logging.getLogger('mangum')
router = APIRouter()


@router.get("/{organization_id}/users")
async def get_organization_users(organization_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    Get all users in an organization
    """
    organization = Organization.get_by_key(Organization, 'organization-id:%s' % organization_id, 'meta')
    users = organization.fetch_users()
    return users


@router.get("/{organization_id}/registries")
async def get_organization_registries(organization_id: str, auth: CognitoTokenCustom = Depends(auth_token_check)):
    """
    Get all registries in an organization
    """
    organization = Organization.get_by_key(Organization, 'organization-id:%s' % organization_id, 'meta')
    registries = organization.fetch_registries()
    return registries
