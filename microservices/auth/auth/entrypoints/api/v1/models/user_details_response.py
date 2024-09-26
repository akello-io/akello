from pydantic import BaseModel

class UserDetailsResponse(BaseModel):
    username: str
    roles: list
    permissions: list