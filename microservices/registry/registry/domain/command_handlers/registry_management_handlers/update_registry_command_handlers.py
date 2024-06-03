from datetime import datetime, timezone
from decimal import Decimal

from registry.domain.commands.registry_management.update_registry_command import UpdateRegistryCommand
from registry.domain.ports import unit_of_work


def handle_update_registry_command(
        command: UpdateRegistryCommand,
        unit_of_work: unit_of_work.UnitOfWork,
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())

    with unit_of_work:
        unit_of_work.registry.update_attributes(
            registry_id=command.registry_id,
            name=command.name,
            description=command.description,
            updated_at=timestamp
        )
        unit_of_work.commit()

    return True
