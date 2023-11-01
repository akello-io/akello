from pydantic import BaseModel
from typing import List, Optional
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import datetime
from decimal import Decimal
from enum import Enum
from akello.dynamodb import registry_db
from akello.dynamodb.models import RegistryDBBaseModel

class UserModel(RegistryDBBaseModel):
    cognito_user_id: int
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    registries: List[str] = []

    @property
    def partition_key(self) -> str:
        return 'user:' + self.cognito_user_id

    @property
    def sort_key(self) -> str:
        return 'profile'


class UserRole(str, Enum):
    care_manager = 'Care Manager'
    primary_care_physician = 'Primary Care Physician'
    consulting_psychiatrist = 'Consulting Psychiatrist'
    clinical_ops = 'Clinical Ops'
    finance = 'Finance'


class RegistryUser(RegistryDBBaseModel):
    """
    Describes which users are in a registry
    """
    registry_id: str
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()
    first_name: str
    last_name: str
    email: str
    role: UserRole
    is_admin: bool = False

    @property
    def partition_key(self) -> str:
        return 'registry-user:' + self.registry_id

    @property
    def sort_key(self) -> str:
        return 'user:' + self.user_id


class UserEmail(RegistryDBBaseModel):
    """
    To look up user ID by email
    """
    email: str
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return 'user-email:' + self.email

    @property
    def sort_key(self) -> str:
        return self.user_id


class UserRegistry(RegistryDBBaseModel):
    """
    Describes which registries a user has access to
    """
    user_id: str
    registry_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return 'user-registry:' + self.user_id

    @property
    def sort_key(self) -> str:
        return 'registry:' + self.registry_id


class UserInvite(BaseModel):
    """
    To be checked on user signup
    """
    email: str
    first_name: str
    last_name: str
    invited_by: str
    registry_id: str
    date_created: int
    role: UserRole

    @property
    def partition_key(self) -> str:
        return 'invite:' + self.email

    @property
    def sort_key(self) -> str:
        return 'registry:' + self.registry_id

    @staticmethod
    def create(cognito_user_id, email, role: UserRole, registry_id):
        response = registry_db.put_item(
            Item={
                "partition_key": 'invite:%s' % email,
                "sort_key": registry_id,
                "invited_by": cognito_user_id,
                "email": email,
                "role": role,
                "date_created": Decimal(datetime.datetime.utcnow().timestamp()),
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    @staticmethod
    def get_invites(email):
        try:
            response = registry_db.query(
                KeyConditionExpression=Key('partition_key').eq('invite:%s' % email)
            )

            invited_registeries = []
            for invite in response['Items']:
                invited_registeries.append({
                    'registry_id': invite['sort_key'],
                    'role': invite['role'],
                    'email': invite['email'],
                })

            return invited_registeries
        except ClientError as e:
            print(e)
