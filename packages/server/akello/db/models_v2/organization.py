import uuid

from akello.db.models_v2 import AkelloBaseModel
from akello.db.models_v2.user import User


class Organization(AkelloBaseModel):
    id: str = str(uuid.uuid4())
    name: str = None
    stripe_customer_id: str
    created_by: User

    @property
    def object_type(self) -> str:
        return 'organization'

    @property
    def sort_key(self) -> str:
        return 'meta'
