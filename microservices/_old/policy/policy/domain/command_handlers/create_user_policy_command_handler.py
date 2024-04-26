import uuid
from datetime import datetime, timezone

from _old._old_user import create_user_command
from _old._old_user import user
from microservices.user.user.domain.ports.inbound import user_query_service


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
