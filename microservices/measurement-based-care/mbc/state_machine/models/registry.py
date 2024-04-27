from pydantic import BaseModel
from .organization_user import OrganizationUser
from .state_machine import StateMachine
from .patient import Patient

class Registry(BaseModel):
    organization_users: list[OrganizationUser]
    state_machine: StateMachine
    patients: list[Patient]