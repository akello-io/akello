import uuid
from datetime import datetime, timezone

from user.domain.commands import get_user_organization
from user.domain.model import user_organization
from user.domain.ports.inbound import user_query_service


def handle_get_user_organization_command(
    command: get_user_organization.GetUserOrganizationCommand,
    user_query_service: user_query_service.UserQueryService,
) -> str:

    return user_query_service.get_organization(user_id=command.user_id, organization_id=command.organization_id)