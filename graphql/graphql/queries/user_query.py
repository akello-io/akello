import requests
import strawberry
from models.user import User
from models.organization import Organization

@strawberry.type
class UserQuery:

    @strawberry.field
    async def select(
            self,
            info,
            user_id: str
    ) -> User:
        print("querying userquery")
        filed_selections  = {selection.name for field in info.selected_fields for selection in field.selections}

        response = requests.get('http://host.docker.internal:8010/%s' % user_id)

        # step 1: API call to the user service
        user = User(**response.json())

        if 'organizations' in filed_selections:
            # step 2:
            # API call to the organization service
            # The organization service should return the organizations the user is associated with
            print('expand organzations for each user')
            response = requests.get(f'http://host.docker.internal:8010/{user_id}/organization')
            if response.status_code == 200:
                user.organizations = []
                for organization_id in response.json():
                    response = requests.get(f'http://host.docker.internal:8011/{organization_id}')
                    if response.status_code != 200:
                        raise Exception('Associated Organization not found')
                    user.organizations.append(Organization(**response.json()))

        return user




