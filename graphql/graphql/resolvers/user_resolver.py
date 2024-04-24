import strawberry
import requests
from models.user import User
from models.organization import Organization


def get_user(user_id: str) -> User:

    response = requests.get('http://host.docker.internal:8010/%s' % user_id)

    if response.status_code != 200:
        raise Exception('User not found')

    if response.json() is None:
        raise Exception('User not found')

    user = User(**response.json())
    return user


def create_user(id: str, email: str) -> None:
    response = requests.post('http://host.docker.internal:8010', json={'id': id, 'email': email})

    if response.status_code != 200:
        raise Exception('Failed to create the user')

def add_organization(user_id: str, organization_id: str) -> None:
    response = requests.post(f'http://host.docker.internal:8010/{user_id}/organization?organization_id={organization_id}', json={})

    if response.status_code != 200:
        raise Exception('Failed to add the organization')
