from _old._old_user import get_user_command
from _old._old_user import user_query_service


def handle_get_user_command(
    command: get_user_command.GetUserCommand,
    user_query_service: user_query_service.UserQueryService,
) -> str:

    user = user_query_service.get(user_id=command.user_id)

    return user
