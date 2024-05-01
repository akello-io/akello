from datetime import datetime, timezone
import uuid

from mbc.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService
from mbc.domain.model.registry import RegistryUser, Registry

from decimal import Decimal


def handle_create_registry_command(
    command: CreateRegistryCommand,
    patient_query_service: DynamoDBRegistryQueryService,
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())
    registry = patient_query_service.create_registry(
        Registry(
            id=uuid.uuid4().hex,
            name=command.name,
            description=command.description,
            created_at=timestamp
        )
    )
    return registry