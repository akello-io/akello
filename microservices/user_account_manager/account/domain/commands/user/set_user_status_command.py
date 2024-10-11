from pydantic import BaseModel


class SetUserStatusCommand(BaseModel):
    user_id: str
    status: str
