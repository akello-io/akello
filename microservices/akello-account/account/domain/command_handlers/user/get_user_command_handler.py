from typing import Optional

from account.domain.commands.user.get_user_command import GetUserCommand
from account.domain.model.user import User
from account.domain.ports.unit_of_work import UnitOfWork

def handle_get_registry_command(
        command: GetUserCommand,
        unit_of_work: UnitOfWork
) -> Optional[User]:
    return unit_of_work.user.get(command.user_id)
