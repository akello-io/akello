from _old._old_user import get_user_organization
from _old._old_user import user_query_service


def handle_get_user_organization_command(
    command: get_user_organization.GetUserOrganizationCommand,
    user_query_service: user_query_service.UserQueryService,
) -> str:

    return user_query_service.get_organization(user_id=command.user_id, organization_id=command.organization_id)