from pydantic import BaseModel


class GetUserCommand(BaseModel):
    id: str
