from pydantic import BaseModel
from typing import Optional

class GetUserOrganizationCommand(BaseModel):
    user_id: str
    organization_id: Optional[str] = None

