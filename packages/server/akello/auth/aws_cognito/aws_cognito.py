import os
from fastapi import Request, HTTPException
from pydantic_settings import BaseSettings
from pydantic.types import Any
from typing import Optional
from fastapi_cognito import CognitoAuth, CognitoSettings
from akello.auth.aws_cognito.auth_settings import CognitoTokenCustom

from pydantic import BaseModel, HttpUrl, Field,parse_obj_as
from jose import jwt


AWS_COGNITO_APP_CLIENT_ID = os.getenv('AWS_COGNITO_APP_CLIENT_ID')
AWS_COGNITO_USERPOOL_ID = os.getenv('AWS_COGNITO_USERPOOL_ID')
AKELLO_COGNITO_URL = os.getenv('AKELLO_COGNITO_URL')
AWS_REGION = os.getenv('AWS_REGION')



class Settings(BaseSettings):
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"
    userpools: dict[str, dict[str, Any]] = {
        "us": {
            "region": AWS_REGION,
            "userpool_id": AWS_COGNITO_USERPOOL_ID,
            "app_client_id": AWS_COGNITO_APP_CLIENT_ID,
            **({"endpoint": AKELLO_COGNITO_URL} if os.environ.get('AKELLO_COGNITO_URL') else {})
        },
    }


async def local_auth_required(request: Request) -> CognitoTokenCustom:
    try:        
        auth_token = request.headers.get('Authorization').replace('Bearer ', '')        
        decoded_token = jwt.get_unverified_claims(auth_token) #NOSONAR
        decoded_token["email"] = decoded_token["username"]        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Unauthroized")
    return parse_obj_as(CognitoTokenCustom, decoded_token)

auth_provider = CognitoAuth(
    settings=CognitoSettings.from_global_settings(Settings()), userpool_name="us",
    custom_model=CognitoTokenCustom
)
