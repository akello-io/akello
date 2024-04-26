from typing import Optional

from pydantic import BaseModel


class CreateUserCommand(BaseModel):
    user_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None
    phone_number: Optional[str] = None
