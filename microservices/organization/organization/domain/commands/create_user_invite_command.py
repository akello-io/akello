from typing import Optional

from pydantic import BaseModel


class CreateUserInviteCommand(BaseModel):
    email: str
    organization_id: str