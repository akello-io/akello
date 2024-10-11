from pydantic import BaseModel


class UpdateUserCommand(BaseModel):
    user_id: str
    name: str
    email: str
