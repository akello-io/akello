# used as a local manual test script for testing the database
from akello.db.models_v2.organization import User
from akello.db.models_v2.organization import Organization
from akello.db.models_v2.user import UserRegistryRole
from akello.db.models_v2.registry_treatment import RegistryTreatment

test_organization_owner = User()

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
care_manager_user = User()
test_registry_1.add_user(user=care_manager_user, role=UserRegistryRole.care_manager, requesting_user=test_organization_owner)


# Add a patient to the registry
# grant a user access to the patient (test access)
# add treatment log and set scores

