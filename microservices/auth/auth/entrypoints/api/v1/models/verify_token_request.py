from pydantic import BaseModel


class VerifyTokenRequest(BaseModel):
    token: str