import uuid
from datetime import datetime, timezone

from user.domain.commands import create_user_command
from user.domain.model import user
from user.domain.ports import user_query_service


def handle_create_user_command(
    command: create_user_command.CreateUserCommand,
    user_query_service: user_query_service.UserQueryService,
) -> str:
    current_time = datetime.now(timezone.utc).isoformat()
    id = str(uuid.uuid4())

    user_obj = user.User(
        id=id,
        name=command.name,
        description=command.description,
        createDate=current_time,
        lastUpdateDate=current_time,
    )

    with user_query_service:
        user_query_service.create(user_obj)

    return id
