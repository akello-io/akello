
import strawberry
from typing import List, Union, Optional

@strawberry.interface
class BaseUser:
    id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None
    phone_number: Optional[str] = None