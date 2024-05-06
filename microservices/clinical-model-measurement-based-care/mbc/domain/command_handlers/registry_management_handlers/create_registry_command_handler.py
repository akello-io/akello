import uuid
from datetime import datetime, timezone
from decimal import Decimal

from mbc.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from mbc.domain.model.registry import Registry
from mbc.domain.ports import unit_of_work


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
