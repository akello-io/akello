import uuid
from datetime import datetime, timezone

from _old_organization.domain.commands import create_organization_command
from _old_organization.domain.model import organization
from _old_organization.domain.ports.inbound import organization_query_service


def handle_create_user_command(
    command: create_organization_command.CreateOrganizationCommand,
    organization_query_service: organization_query_service.OrganizationQueryService
) -> str:
    current_time = datetime.now(timezone.utc).isoformat()
    id = str(uuid.uuid4())

    org_obj = organization.Organization(
        id=id,
        name=command.name,
        createDate=current_time,
        lastUpdateDate=current_time,
    )

    with organization_query_service:
        organization_query_service.create(org_obj)

    return id
