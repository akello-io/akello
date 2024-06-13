import enum
import json
import typing
import traceback
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
        if self._email_exists(user.email):
            raise ValueError("Email already exists")
        self.add_generic_item(item=user.model_dump(),
                              key=self.generate_user_key(user.id))

    def update_attributes(self, user_id: str, **kwargs) -> None:
        orginal_user = self.get(user_id)
        if 'email' in kwargs:
            email = kwargs['email']
            if (orginal_user != email) & self._email_exists(email):
                raise ValueError("Email already exists")
        try:
            update_expression_names = {
                f"#{key}": key for key in kwargs.keys()
            }
            update_expression_setters = [
                f"#{key}=:p{idx}" for idx, (key, value) in enumerate(kwargs.items())
            ]
            update_values = {
                f":p{idx}": value for idx, (key, value) in enumerate(kwargs.items())
            }
            self.update_generic_item(
                expression={
                    "UpdateExpression": f"set {', '.join(update_expression_setters)}",
                    "ExpressionAttributeValues": update_values,
                    "ExpressionAttributeNames": update_expression_names,
                    "ConditionExpression": "(attribute_exists(partition_key) AND attribute_exists(sort_key))",
                },
                key=self.generate_user_key(user_id)
            )
        except Exception as e:
            raise ValueError(e)

    def get(self, user_id: str) -> User:
        key = self.generate_user_key(user_id)
        request = self._create_get_request(key)
        user_dict = self._context.get_generic_item(request)
        if user_dict is None:
            raise ValueError(f"User {user_id} does not exist")
        return User(**user_dict)

    def delete(self, user_id: str) -> None:
        pass

    @staticmethod
    def generate_user_key(user_id: str) -> dict:
        """Generates primary key for registry item."""
        return {
            "partition_key": f"{DBPrefix.USER.value}#{user_id}",
            "sort_key": f"{DBPrefix.USER.value}#{user_id}",
        }


    def _email_exists(self, email: str) -> bool:
        request = {
            'TableName': self._table_name,
            'IndexName': 'EmailIndex',
            'KeyConditionExpression': 'email = :email',
            'ExpressionAttributeValues': {
                ':email': email
            }
        }
        try:
            items = self._context.query_items(request)
            return len(items) > 0
        except Exception as e:
            print(f"Error querying email existence: {e}")
            raise


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
