import strawberry
from models.user import User
from resolvers.user_resolver import create_user
class UserMutations:


    @strawberry.mutation
    def create_user(self, id: str, email: str) -> None:
        return create_user(id, email)