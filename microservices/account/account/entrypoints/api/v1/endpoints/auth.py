from fastapi import APIRouter
from fastapi import Depends
from fastapi_cognito import CognitoToken
import logging

from fastapi_cognito import CognitoAuth, CognitoSettings
from account.entrypoints.api.auth_settings import settings

cognito = CognitoAuth(
  settings=CognitoSettings.from_global_settings(settings)
)

logger = logging.getLogger('mangum')
router = APIRouter()

@router.get("/")
def auth(auth: CognitoToken = Depends(cognito.auth_required)):
    return {"message": "Hello world"}