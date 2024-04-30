from datetime import datetime, timezone

from mbc.domain.commands.registry_management.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService
from mbc.domain.model.registry import RegistryUser

from decimal import Decimal


def handle_add_user_to_registry_command(
    command: AddUserToRegistryCommand,
    patient_query_service: DynamoDBRegistryQueryService,
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())
    patient_query_service.add_registry_user(
        RegistryUser(
            registry_id=command.registry_id,
            user_id=command.user_id,
            role=command.role,
            state='active',
            created_at=timestamp,
            is_enabled=True
        )
    )
    return True
