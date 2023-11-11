import os
from fastapi import Request
from pydantic_settings import BaseSettings
from pydantic.types import Any
from typing import Optional
from fastapi_cognito import CognitoAuth, CognitoSettings
from pydantic import BaseModel, HttpUrl, Field,parse_obj_as
from akello.settings import AWS_REGION, AWS_COGNITO_USERPOOL_ID, AWS_COGNITO_APP_CLIENT_ID
from jose import jwt


class Settings(BaseSettings):
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"
    userpools: dict[str, dict[str, Any]] = {
        "us": {
            "region": AWS_REGION,
            "userpool_id": AWS_COGNITO_USERPOOL_ID,
            "app_client_id": AWS_COGNITO_APP_CLIENT_ID,
            **({"endpoint": "http://localhost:9229"} if os.environ.get('AKELLO_ENV') == 'LOCAL' else {})
        },
    }


class CognitoTokenCustom(BaseModel):
    origin_jti: Optional[str] = None
    cognito_id: str = Field(alias="sub")
    event_id: Optional[str] = None
    token_use: str
    scope: Optional[str] = None
    auth_time: int
    iss: HttpUrl
    exp: int
    iat: int
    jti: str
    client_id: Optional[str] = None
    username: Optional[str] = None
    email: str


async def local_auth_required(request: Request) -> CognitoTokenCustom:
    auth_token = request.headers.get('Authorization').replace('Bearer ', '')
    decoded_token = jwt.get_unverified_claims(auth_token)
    decoded_token["email"] = decoded_token["cognito:username"]
    return parse_obj_as(CognitoTokenCustom, decoded_token)

auth_provider = CognitoAuth(
    settings=CognitoSettings.from_global_settings(Settings()), userpool_name="us",
    custom_model=CognitoTokenCustom
)
