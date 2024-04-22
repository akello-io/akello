import strawberry
from models.user import User

class UserMutations:


    @strawberry.mutation
    def create_user(self, id: str, email: str) -> User:
        return User(id=id, email=email)