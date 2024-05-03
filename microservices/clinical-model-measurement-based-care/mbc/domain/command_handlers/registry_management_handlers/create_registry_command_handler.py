from datetime import datetime, timezone
import uuid

from mbc.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from mbc.domain.ports.registry_query_service import RegistryQueryService
from mbc.domain.model.registry import RegistryUser, Registry
from mbc.domain.ports import unit_of_work

from decimal import Decimal


def handle_create_registry_command(
    command: CreateRegistryCommand,
    unit_of_work: unit_of_work.UnitOfWork,
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())

    registry_obj = Registry(
        id=uuid.uuid4().hex,
        name=command.name,
        description=command.description,
        created_at=timestamp
    )

    with unit_of_work:
        unit_of_work.registry.create(registry_obj)
        unit_of_work.commit()

    return True
