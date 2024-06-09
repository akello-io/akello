from fastapi import APIRouter, Depends
from fastapi_cognito import CognitoToken

from account.entrypoints.api import config
from account.entrypoints.api.config import cognito_us


router = APIRouter()
app_config = config.AppConfig(**config.config)

@router.get("/")
async def hello_world(auth: CognitoToken = Depends(cognito_us.auth_required)):
    pass
