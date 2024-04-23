import strawberry

from models.user import User
from models.patient import Patient
from models.organization import Organization

from resolvers.patient_resolver import get_patient
from queries.user_query import UserQuery
from queries.organization_query import OrganizationQuery

from mutations.user import UserMutations
from mutations.organization import OrganizationMutations



@strawberry.type
class Query:

    @strawberry.field
    def user(self) -> UserQuery:
        return UserQuery()


    @strawberry.field
    def organization(self) -> OrganizationQuery:
        return OrganizationQuery()

    patient: Patient = strawberry.field(resolver=get_patient)

@strawberry.type
class Mutation:
    create_user = UserMutations.create_user
    create_organization = OrganizationMutations.create_organization


schema = strawberry.Schema(query=Query, mutation=Mutation)