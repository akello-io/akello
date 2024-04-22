import strawberry
from typing import List, Union, Optional



@strawberry.interface
class BaseUser:
    id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    picture: Optional[str] = None
    phone_number: Optional[str] = None

@strawberry.type
class User(BaseUser):
    organizations: Optional['Organization']

@strawberry.type
class Patient(BaseUser):
    registry: Optional['Registry']


@strawberry.type
class Organization:
    id: str
    name: str
    registries: Optional['Registry']


@strawberry.type
class Registry:
    id: str
    name: str


def get_user(user_id: str) -> User:
    return User(id=user_id, email='v@v.com', organizations=Organization(id='1', name='org1', registries=Registry(id='1', name='reg1')))

def get_patient(user_id: str) -> Patient:
    return Patient(id=user_id, email='v@v.com', registry=Registry(id='1', name='reg1'))

@strawberry.type
class Query:
    user: User = strawberry.field(resolver=get_user)
    patient: Patient = strawberry.field(resolver=get_patient)

schema = strawberry.Schema(query=Query)
