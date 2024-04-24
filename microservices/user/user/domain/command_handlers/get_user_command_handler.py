import uuid
from datetime import datetime, timezone

from user.domain.commands import get_user_command
from user.domain.model import user
from user.domain.ports.inbound import user_query_service


def handle_get_user_command(
    command: get_user_command.GetUserCommand,
    user_query_service: user_query_service.UserQueryService,
) -> str:

    user = user_query_service.get(user_id=command.user_id)

    return user
