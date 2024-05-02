from datetime import datetime, timezone
import uuid

from mbc.domain.commands.registry_management.update_registry_command import UpdateRegistryCommand
from mbc.domain.ports.registry_query_service import RegistryQueryService
from mbc.domain.model.registry import RegistryUser, Registry

from decimal import Decimal


def handle_update_registry_command(
    command: UpdateRegistryCommand,
    patient_query_service: RegistryQueryService,
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())
    registry = patient_query_service.update_registry(
        Registry(
            id=uuid.uuid4().hex,
            name=command.name,
            description=command.description,
            created_at=timestamp
        )
    )


    return registry
