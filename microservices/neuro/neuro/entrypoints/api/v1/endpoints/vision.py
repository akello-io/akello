from fastapi import APIRouter, Depends
from fastapi_cognito import CognitoToken

from neuro.entrypoints.api import config
from neuro.entrypoints.api.config import cognito_us


router = APIRouter()
app_config = config.AppConfig(**config.config)

@router.get("/")
async def test():
    return {"message": "Hello World"}
