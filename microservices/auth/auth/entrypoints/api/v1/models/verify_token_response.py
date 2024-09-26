from pydantic import BaseModel

from typing import Optional, Dict

class VerifyTokenResponse(BaseModel):
    valid: bool
    claims: Optional[Dict[str, str]] = None