# used as a local manual test script for testing the database
import uuid

from akello.db.models.organization import Organization
from akello.db.models.registry_treatment import RegistryTreatment
from akello.db.models.user import User, UserRegistryRole, UserInvite

test_organization_owner = User(id=str(uuid.uuid4()), email='test_org@gmail.com')
test_organization_owner.put()
care_manager_user = User(id=str(uuid.uuid4()), email='test_care_manager_org@gmail.com')
care_manager_user.put()
patient_user = User(id=str(uuid.uuid4()), email='test_patient_user_org@gmail.com')
patient_user.put()

# Test user creates an organization
org = Organization(
    name='test org',
    created_by=test_organization_owner
)
org.create(requesting_user=test_organization_owner)

# Test user creates a registry for the organization
test_registry_1 = org.create_registry(name='test registry 1', logo='test logo', requesting_user=test_organization_owner)
test_registry_2 = org.create_registry(name='test registry 2', logo='test logo', requesting_user=test_organization_owner)
test_registry_3 = org.create_registry(name='test registry 3', logo='test logo', requesting_user=test_organization_owner)

# add a care manager user to the registry
test_registry_1.add_user(user=care_manager_user, role=UserRegistryRole.care_manager,
                         requesting_user=test_organization_owner)

# Add a patient to the registry
test_registry_1.add_user(user=patient_user, role=UserRegistryRole.patient, requesting_user=test_organization_owner)

# grant a user access to the patient (test access)

# add treatment log and set scores
patient_registry_treatment = RegistryTreatment(
    registry_id=test_registry_1.id,
    user_id=patient_user.id,
    mrn='test mrn',
)

patient_registry_treatment.add_approved_provider(authorized_user=care_manager_user, requesting_user=patient_user)

UserInvite(
    object_type='registry',
    object_id=test_registry_1.id,
    user_email='test@gmail.com',
    invited_by_user_id=test_organization_owner.id,
    role=UserRegistryRole.patient
).put()

invited_patient = User(id=str(uuid.uuid4()), email='test@gmail.com')
invites = invited_patient.fetch_invites()
assert len(invites) == 1
