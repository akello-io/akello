import enum
import json
import typing


from account.domain.model.organization import Organization
from account.domain.model.user import User
from account.domain.ports import unit_of_work
from mypy_boto3_dynamodb import client
from .dynamodb_base import DynamoDBRepository
from .dynamodb_base import DynamoDBContext


class DBPrefix(enum.Enum):
    ORGANIZATION = "ORGANIZATION"
    USER = "USER"


class DynamoDBUserRepository(unit_of_work.UserRepository, DynamoDBRepository):
    def __init__(self, table_name, context: DynamoDBContext):
        super().__init__(table_name, context)

    def create(self, user: User) -> None:
        pass

    def update_attributes(self, user_id: str, **kwargs) -> User:
        pass

    def get(self, user_id: str) -> User:
        #key = self.generate_user_key(user_id)
        #request = self._create_get_request(key)
        #user_dict = self._context.get_generic_item(request)
        mock_user = User(**{
            "id": "1",
            "name": "fake1",
            "email": "fake1@gmail.com",
            "enabled": True,
            "created_at": "100",
            "updated_at": "101"
        })
        return mock_user
        #return User(**user_dict)

    def delete(self, user_id: str) -> None:
        pass

    @staticmethod
    def generate_user_key(user_id: str) -> dict:
        """Generates primary key for registry item."""
        return {
            "partition_key": f"{DBPrefix.ORGANIZATION.value}#{user_id}",
            "sort_key": f"{DBPrefix.ORGANIZATION.value}#{user_id}",
        }


class DynamoDBOrganizationRepository(unit_of_work.OrganizationRepository, DynamoDBRepository):
    def __init__(self, table_name, context: DynamoDBContext):
        super().__init__(table_name, context)

    def create(self, organization: Organization) -> None:
        pass

    def update_attributes(self, uorganization_id: str, **kwargs) -> None:
        pass

    def delete(self, organization_id: str) -> None:
        pass

    def get(self, uorganization_id: str) -> Organization:
        pass


class DynamoDBUnitOfWork(unit_of_work.UnitOfWork):
    user: DynamoDBUserRepository
    organization: DynamoDBOrganizationRepository

    def __init__(self, table_name: str, dynamodb_client: client.DynamoDBClient):
        self._dynamo_db_client = dynamodb_client
        self._table_name = table_name
        self._context: typing.Optional[DynamoDBContext] = None

    def commit(self) -> None:
        """Commits up to 25 changes to the DynamoDB table in a single transaction."""
        if self._context:
            self._context.commit()

    def __enter__(self) -> typing.Any:
        self._context = DynamoDBContext(
            dynamodb_client=self._dynamo_db_client
        )
        self.user = DynamoDBUserRepository(
            table_name=self._table_name, context=self._context
        )

        self.organization = DynamoDBOrganizationRepository(
            table_name=self._table_name, context=self._context
        )

        return self

    def __exit__(self, *args) -> None:
        self._context = None
        self.user = None  # type: ignore
        self.organization = None
