import strawberry

from models.user import User
from models.patient import Patient
from models.organization import Organization

from resolvers.patient_resolver import get_patient
from resolvers.organization_resolver import get_organization
from queries.user_query import UserQuery

from mutations.user import UserMutations



@strawberry.type
class Query:

    @strawberry.field
    def user(self) -> UserQuery:
        return UserQuery()

    patient: Patient = strawberry.field(resolver=get_patient)
    organization: Organization = strawberry.field(resolver=get_organization)

@strawberry.type
class Mutation:
    create_user = UserMutations.create_user


schema = strawberry.Schema(query=Query, mutation=Mutation)