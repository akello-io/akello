from pydantic import BaseModel

class AssumeRoleRequest(BaseModel):
    roleArn: str