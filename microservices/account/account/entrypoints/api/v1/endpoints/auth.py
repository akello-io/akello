from fastapi import APIRouter
from fastapi import Depends
from fastapi_cognito import CognitoToken
import logging

from fastapi_cognito import CognitoAuth, CognitoSettings
from account.entrypoints.api.auth_settings import settings

# default userpool(eu) will be used if there is no userpool_name param provided.
cognito_eu = CognitoAuth(
  settings=CognitoSettings.from_global_settings(settings)
)
cognito_us = CognitoAuth(
  settings=CognitoSettings.from_global_settings(settings), userpool_name="us"
)

logger = logging.getLogger('mangum')
router = APIRouter()

@router.get("/")
def auth(auth: CognitoToken = Depends(cognito_eu.auth_required)):
    return {"message": "Hello world"}