import strawberry
import requests
from models.user import User
from models.organization import Organization


def get_user(user_id: str) -> User:

    response = requests.get('http://localhost:8000/%s' % user_id)

    if response.status_code != 200:
        raise Exception('User not found')

    if response.json() is None:
        raise Exception('User not found')

    user = User(**response.json())
    return user


