import requests
import strawberry
from models.organization import Organization

@strawberry.type
class OrganizationQuery:

    @strawberry.field
    async def select(
            self,
            info,
            organization_id: str
    ) -> Organization:
        filed_selections  = {selection.name for field in info.selected_fields for selection in field.selections}

        response = requests.get('http://host.docker.internal:8011/%s' % organization_id)

        if not response.json():
            raise Exception('Organization not found')

        organization = Organization(**response.json())

        if 'users' in filed_selections:
            pass

        return organization