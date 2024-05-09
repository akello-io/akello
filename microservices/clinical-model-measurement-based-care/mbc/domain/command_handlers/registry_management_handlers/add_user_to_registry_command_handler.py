from datetime import datetime, timezone

from mbc.domain.commands.registry_management.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.domain.model.registry import RegistryUser
from mbc.domain.ports import unit_of_work

from decimal import Decimal


def handle_add_user_to_registry_command(
    command: AddUserToRegistryCommand,
    unit_of_work: unit_of_work.UnitOfWork
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())

    registry_user = RegistryUser(
        registry_id=command.registry_id,
        user_id=command.user_id,
        role=command.role,
        state='active',
        created_at=timestamp,
        is_enabled=True
    )

    with unit_of_work:
        unit_of_work.registry_user.add(registry_user)
        unit_of_work.commit()

    return True
