from enum import Enum


class PatientStatysTypes(str, Enum):
    accepted = 'Accepted'
    enrolled = 'Enrolled'
    treatment = 'Treatment'
    relapse_prevention_plan = 'Relapse Prevention Plan'
    deactivated = 'Deactivated'
