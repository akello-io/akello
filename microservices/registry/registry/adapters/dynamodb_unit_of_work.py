import json
import typing
from decimal import Decimal

from mypy_boto3_dynamodb import client

from registry.adapters.internal import dynamodb_base
from registry.domain.model.measurement import Measurement
from registry.domain.model.registry import Registry, RegistryUser
from registry.domain.ports import unit_of_work

from .utils import DBPrefix


class DynamoDBRegistryRepository(
    dynamodb_base.DynamoDBRepository, unit_of_work.RegistryRepository
):
    """Registry DynamoDB repository."""

    def __init__(self, table_name, context: dynamodb_base.DynamoDBContext):
        super().__init__(table_name, context)

    def create(self, registry: Registry) -> None:
        self.add_generic_item(
            item=registry.model_dump(),
            key=self.generate_registry_key(registry.id))

    def update_attributes(self, registry_id: str, **kwargs) -> None:
        """Updates arbitraty attributes of the product in DynamoDB table."""
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
            key=self.generate_registry_key(registry_id)
        )

    def get(self, registry_id: str) -> Registry:
        key = self.generate_registry_key(registry_id)
        request = self._create_get_request(key)
        registry_dict = self._context.get_generic_item(request)
        return (
            Registry(**registry_dict)
        )

    def delete(self, registry_id: str) -> None:
        key = self.generate_registry_key(registry_id)
        self.delete_generic_item(key=key)

    @staticmethod
    def generate_registry_key(registry_id: str) -> dict:
        """Generates primary key for registry item."""
        return {
            "partition_key": f"{DBPrefix.REGISTRY.value}#{registry_id}",
            "sort_key": f"{DBPrefix.REGISTRY.value}#{registry_id}",
        }


class DynamoDBRegistryUserRepository(
    dynamodb_base.DynamoDBRepository, unit_of_work.RegistryUserRepository
):
    """Registry User DynamoDB repository."""

    def __init__(self, table_name, context: dynamodb_base.DynamoDBContext):
        super().__init__(table_name, context)

    def add(self, registry_user: RegistryUser) -> None:
        self.add_generic_item(
            item=registry_user.model_dump(),
            key=self.generate_registry_user_key(registry_id=registry_user.registry_id, user_id=registry_user.user_id)
        )

    def update_attributes(self, registry_id: str, user_id: str, **kwargs) -> None:
        """Updates arbitraty attributes of the product in DynamoDB table."""
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
            key=self.generate_registry_user_key(registry_id=registry_id, user_id=user_id)
        )

    def get(self, registry_id: str, user_id: str) -> RegistryUser:
        key = self.generate_registry_user_key(registry_id, user_id)
        request = self._create_get_request(key)
        registry_user_dict = self._context.get_generic_item(request)
        return (
            RegistryUser(**registry_user_dict)
        )

    def delete(self, registry_id: str, user_id: str) -> None:
        key = self.generate_registry_user_key(registry_id, user_id)
        self.delete_generic_item(key=key)

    @staticmethod
    def generate_registry_user_key(registry_id: str, user_id: str) -> dict:
        """Generates primary key for registry user item."""
        return {
            "partition_key": f"{DBPrefix.REGISTRY.value}#{registry_id}",
            "sort_key": f"{DBPrefix.USER.value}#{user_id}",
        }


class DynamoDBMeasurementRepository(
    dynamodb_base.DynamoDBRepository, unit_of_work.MeasurementRepository
):
    """Measurement DynamoDB repository."""

    def __init__(self, table_name, context: dynamodb_base.DynamoDBContext):
        super().__init__(table_name, context)

    def add(self, measurement: Measurement) -> None:
        item = json.loads(measurement.model_dump_json(), parse_float=Decimal)
        self.add_generic_item(
            item=item,
            key=self.generate_measurement_key(measurement.measurement_id)
        )

    def update_attributes(self, measurement_id: str, **kwargs) -> None:
        """Updates"""
        raise Exception("Not implemented")

    def get(self, measurement_id: str) -> Measurement:
        raise Exception("Not implemented")

    def delete(self, measurement_id: str) -> None:
        raise Exception("Not implemented")

    @staticmethod
    def generate_measurement_key(measurement_id: str) -> dict:
        """Generates primary key for measurement item."""
        return {
            "partition_key": f"{DBPrefix.MEASUREMENT.value}#{measurement_id}",
            "sort_key": f"{DBPrefix.MEASUREMENT.value}#{measurement_id}",
        }


class DynamoDBUnitOfWork(unit_of_work.UnitOfWork):
    registry: DynamoDBRegistryRepository
    registry_user: DynamoDBRegistryUserRepository
    measurement: DynamoDBMeasurementRepository

    def __init__(self, table_name: str, dynamodb_client: client.DynamoDBClient):
        self._dynamo_db_client = dynamodb_client
        self._table_name = table_name
        self._context: typing.Optional[dynamodb_base.DynamoDBContext] = None

    def commit(self) -> None:
        """Commits up to 25 changes to the DynamoDB table in a single transaction."""
        if self._context:
            self._context.commit()

    def __enter__(self) -> typing.Any:
        self._context = dynamodb_base.DynamoDBContext(
            dynamodb_client=self._dynamo_db_client
        )
        self.registry = DynamoDBRegistryRepository(
            table_name=self._table_name, context=self._context
        )

        self.registry_user = DynamoDBRegistryUserRepository(
            table_name=self._table_name, context=self._context
        )

        self.measurement = DynamoDBMeasurementRepository(
            table_name=self._table_name, context=self._context
        )

        return self

    def __exit__(self, *args) -> None:
        self._context = None
        self.registry = None  # type: ignore
        self.registry_user = None
