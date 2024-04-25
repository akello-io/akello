import uuid
from datetime import datetime, timezone

from user.domain.commands import create_user_organization
from user.domain.model import user_organization
from user.domain.ports.inbound import user_query_service


def handle_create_user_organization_command(
    command: create_user_organization.CreateUserOrganizationCommand,
    user_query_service: user_query_service.UserQueryService,
) -> str:

    user_query_service.add_organization(user_id=command.user_id, user_organization_id=command.user_organization_id)

    ## TODO: Create a user policy for DynamoDB on user-id resources
    # user-id can access user-id resources

    return id
