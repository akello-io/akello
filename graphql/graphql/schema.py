
import strawberry

from models.user import User
from models.patient import Patient

from resolvers.user_resolver import get_user
from resolvers.patient_resolver import get_patient

@strawberry.type
class Query:
    user: User = strawberry.field(resolver=get_user)
    patient: Patient = strawberry.field(resolver=get_patient)

schema = strawberry.Schema(query=Query)