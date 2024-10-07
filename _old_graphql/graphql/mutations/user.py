import strawberry
from models.user import User
from resolvers.user_resolver import create_user
from resolvers.user_resolver import add_organization
class UserMutations:


    @strawberry.mutation
    def create_user(self, id: str, email: str) -> None:
        return create_user(id, email)

    @strawberry.mutation
    def add_organization(self, user_id: str, organization_id: str) -> None:
        return add_organization(user_id, organization_id)