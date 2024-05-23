import os
from pydantic_settings import BaseSettings
from pydantic.types import Any

AWS_COGNITO_APP_CLIENT_ID = os.getenv('AWS_COGNITO_APP_CLIENT_ID')
AWS_COGNITO_USERPOOL_ID = os.getenv('AWS_COGNITO_USERPOOL_ID')
AWS_REGION = os.getenv('AWS_REGION')

class Settings(BaseSettings):
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"
    userpools: dict[str, dict[str, Any]] = {
        "us": {
            "region": AWS_REGION,
            "userpool_id": AWS_COGNITO_USERPOOL_ID,
            "app_client_id": [AWS_COGNITO_APP_CLIENT_ID]
        },
    }

settings = Settings()