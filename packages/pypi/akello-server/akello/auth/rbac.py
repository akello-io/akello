
"""
Resources
- Organization
- Registry
- Reports
- MeasurementAdmin
- User
- Patients
- PatientSelf
"""

RESOURCES_FOR_ROLES = {
    'admin': {
        'resource1': ['read', 'write', 'delete'],
        'resource2': ['read', 'write'],
    },
    'user': {
        'resource1': ['read'],
        'resource2': ['read', 'write'],
    },
    'patient': {
        'patient-self': ['read'],
    }
}
