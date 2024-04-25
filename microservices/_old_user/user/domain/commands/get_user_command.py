from pydantic import BaseModel


class GetUserCommand(BaseModel):
    user_id: str
