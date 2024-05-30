import uuid
from datetime import datetime, timezone
from decimal import Decimal

from account.domain.commands.user.add_user_command import AddUserCommand
from account.domain.model.user import User
from account.domain.ports.unit_of_work import UnitOfWork


def handle_add_user_command(
        command: AddUserCommand,
        unit_of_work: UnitOfWork
) -> str:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())
    user_obj = User(
        id=uuid.uuid4().hex,
        name=command.name,
        email=command.email,
        enabled=True,
        created_at=str(timestamp),
        updated_at=str(timestamp)
    )

    with unit_of_work:
        unit_of_work.user.create(user_obj)
        unit_of_work.commit()
    return user_obj.id

