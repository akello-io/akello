from enum import Enum
from typing import Optional, List

from boto3.dynamodb.conditions import Key
from pydantic import TypeAdapter, BaseModel

from akello.db.connector.dynamodb import registry_db
from akello.db.models import AkelloBaseModel


class User(AkelloBaseModel):
    id: str  # cognito_id
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None
    phone_number: Optional[str] = None

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'

    def put(self):
        # TODO: verify security
        self._AkelloBaseModel__put()

    def fetch_user_sessions(self):
        # Define the partition key value
        partition_key_value = f"user-id:{self.id}"

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'session-id:'),
        )

        # Extract sessions from the response
        sessions = response.get('Items', [])
        ta = TypeAdapter(List[UserSession])
        return ta.validate_python(sessions)

    def fetch_user_organizations(self):
        # Define the partition key value
        partition_key_value = f"user-id:{self.id}"

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'organization-id:'),
        )

        # Extract organizations from the response
        organizations = response.get('Items', [])
        ta = TypeAdapter(List[UserOrganization])
        return ta.validate_python(organizations)

    def fetch_registries(self):
        # Define the partition key value
        partition_key_value = f"user-id:{self.id}"

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'registry-id:'),
        )

        # Extract registries from the response
        registries = response.get('Items', [])
        ta = TypeAdapter(List[UserRegistry])
        return ta.validate_python(registries)

    def fetch_invites(self, requesting_email: str):
        # Define the partition key value
        partition_key_value = f"user-email:{requesting_email}"

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'user-invite::'),
        )

        # Extract invites from the response
        invites = response.get('Items', [])
        ta = TypeAdapter(List[UserInvite])
        return ta.validate_python(invites)


class UserRegistryRole(str, Enum):
    admin = 'Admin'
    care_manager = 'Care Manager'
    psychiatrist = 'Psychiatrist'
    physician = 'Physician'
    patient = 'Patient'


class UserRegistry(AkelloBaseModel):
    user_id: str
    registry_id: str
    role: UserRegistryRole

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.user_id

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


class UserOrganizationRole(str, Enum):
    admin = 'Admin'
    member = 'Member'


class UserOrganization(AkelloBaseModel):
    user_id: str
    organization_id: str
    role: UserOrganizationRole

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.user_id

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id


class UserOrganizationInvite(AkelloBaseModel):
    user_email: str
    organization_id: str
    invited_by_user_id: str
    role: str
    accepted: bool = False

    @property
    def partition_key(self) -> str:
        return 'user-email:%s' % self.user_email

    @property
    def sort_key(self) -> str:
        return 'invited-organization-id:%s' % self.organization_id


class UserSession(AkelloBaseModel):
    user_id: str
    session_id: str
    user_agent: str
    ip_address: str

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.user_id

    @property
    def sort_key(self) -> str:
        return str(self.created_at)

    def put(self):
        self._AkelloBaseModel__put()


class UserInvite(AkelloBaseModel):
    object_type: str # registry / organization
    object_id: str # registry_id / organization_id
    user_email: str
    user_phone_number: Optional[str] = None
    invited_by_user_id: str
    role: str # UserRegistryRole / UserOrganizationRole
    accepted: Optional[bool] = None
    payload: Optional[dict] = {}

    @property
    def partition_key(self) -> str:
        return 'user-email:%s' % self.user_email

    @property
    def sort_key(self) -> str:
        return 'user-invite::%s-id:%s' % (self.object_type, self.object_id)

    def put(self):
        self._AkelloBaseModel__put()

    def to_scrubbed(self):
        return {
            'object_type': self.object_type,
            'object_id': self.object_id,
            'user_email': self.user_email,
            'invited_by_user_id': self.invited_by_user_id,
            'role': self.role,
            # 'accepted': self.accepted,
            # 'payload': self.payload
        }