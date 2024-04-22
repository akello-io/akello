import strawberry
from models.user import User
from models.organization import Organization

@strawberry.type
class UserQuery:

    @strawberry.field
    async def select(
            self,
            info,
            id: str,
            email: str,
            org_id: str,
    ) -> User:
        filed_selections  = {selection.name for field in info.selected_fields for selection in field.selections}

        # step 1: API call to the user service
        user = User(id='1', email='test1'), User(id='2', email='test2')


        if 'organizations' in filed_selections:
            # step 2:
            # API call to the organization service
            # The organization service should return the organizations the user is associated with
            print('expand organzations for each user')
            user.organizations = Organization(id='1', name='org1')

        return user




