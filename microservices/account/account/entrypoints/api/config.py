import os
import typing
from pydantic_settings import BaseSettings
from pydantic.types import Any
from fastapi_cognito import CognitoAuth, CognitoSettings

from pydantic import BaseModel, Field



class AuthSettings(BaseSettings):
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"
    userpools: dict[str, dict[str, Any]] = {
        "eu": {
            "region": "USERPOOL_REGION",
            "userpool_id": "USERPOOL_ID",
            "app_client_id": ["APP_CLIENT_ID_1", "APP_CLIENT_ID_2"] # Example with multiple ids
        },
        "us": {
            "region": "USERPOOL_REGION",
            "userpool_id": "USERPOOL_ID",
            "app_client_id": "APP_CLIENT_ID"
        },
    }

class AppConfig(BaseModel):
    cors_config: dict = Field(..., title="CORS configuration")

    @staticmethod
    def get_api_base_path() -> str:
        return f'/{os.environ.get("API_BASE_PATH")}'

    @staticmethod
    def get_default_region() -> typing.Optional[str]:
        return os.environ.get("AWS_DEFAULT_REGION", 'us-east-1')

    @staticmethod
    def get_table_name() -> str:
        return os.environ.get("TABLE_NAME", "akello_core")


auth_settings = AuthSettings()

cognito_us = CognitoAuth(
  settings=CognitoSettings.from_global_settings(auth_settings), userpool_name="us"
)


config = {
    "cors_config": {
        "allow_origin": "*",
        "expose_headers": [],
        "allow_headers": [
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-amz-security-token"
        ],
        "max_age": 100,
        "allow_credentials": True,
    },
}
