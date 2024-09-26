from pydantic import BaseModel

class AssumeRoleResponse(BaseModel):
    accessKeyId: str
    secretAccessKey: str
    sessionToken: str
    expiration: str