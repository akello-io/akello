import uuid
from datetime import datetime, timezone

from _old._old_user import create_user_command
from _old._old_user import user
from _old._old_user import user_query_service


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

    user_query_service.create(user_obj)

    ## TODO: Create a user policy for DynamoDB on user-id resources
    # user-id can access user-id resources

    return id
