import re
from datetime import datetime, timezone
from decimal import Decimal

from account.domain.commands.user.update_user_command import UpdateUserCommand
from account.domain.ports.unit_of_work import UnitOfWork


def _is_valid_email(email: str) -> bool:
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None


def handle_update_user_command(
        command: UpdateUserCommand,
        unit_of_work: UnitOfWork
) -> bool:
    if not _is_valid_email(command.email):
        raise ValueError("Invalid email format")

    timestamp = Decimal(datetime.now(timezone.utc).timestamp())

    with unit_of_work:
        unit_of_work.user.update_attributes(user_id=command.user_id, name=command.name, email=command.email,
                                            updated_at=str(timestamp))
        unit_of_work.commit()
    return True
