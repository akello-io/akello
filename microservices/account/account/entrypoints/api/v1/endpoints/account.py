from fastapi import APIRouter, Depends
from fastapi_cognito import CognitoToken

from account.entrypoints.api import config
from account.entrypoints.api.config import cognito_us


router = APIRouter()
app_config = config.AppConfig(**config.config)

@router.get("/{account_id}")
async def get_account(account_id: str, auth: CognitoToken = Depends(cognito_us.auth_required)):
    #TODO: need to verify the user has access to this account
    print("Account ID: ", account_id)
