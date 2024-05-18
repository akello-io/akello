from pydantic import BaseModel


class AddUserCommand(BaseModel):
    name: str
    email: str
