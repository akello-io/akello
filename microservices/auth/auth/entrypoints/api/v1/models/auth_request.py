from pydantic import BaseModel

class AuthRequest(BaseModel):
    username: str
    password: str