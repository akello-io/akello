from akello.db.models_v2.user import User
from akello.services import BaseService


class UserService(BaseService):
    user: User = None

    def __init__(self, user_id: str):
        self.user = User(user_id)

    def get(self) -> User:
        return self.user.get()

    def put(self) -> User:
        return self.user.put()

    def create(self, user: User) -> User:
        return self.user.create(user)

    # SECURITY RELATED METHODS
    def set_mfa_preferences(self):
        pass
