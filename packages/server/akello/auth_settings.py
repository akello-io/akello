from pydantic_settings import BaseSettings
from pydantic.types import Any
from typing import Optional
from fastapi_cognito import CognitoAuth, CognitoSettings
from pydantic import BaseModel, HttpUrl, Field
from akello.settings import AWS_REGION, AWS_COGNITO_USERPOOL_ID, AWS_COGNITO_APP_CLIENT_ID

class Settings(BaseSettings):
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"
    userpools: dict[str, dict[str, Any]] = {
        "us": {
            "region": AWS_REGION,
            "userpool_id": AWS_COGNITO_USERPOOL_ID,
            "app_client_id": AWS_COGNITO_APP_CLIENT_ID
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


cognito_us = CognitoAuth(
    settings=CognitoSettings.from_global_settings(Settings()), userpool_name="us",
    custom_model=CognitoTokenCustom
)
