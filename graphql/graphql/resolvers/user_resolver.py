from models.user import User


def get_user(user_id: str) -> User:
    return User(id=user_id, email='v@v.com')
