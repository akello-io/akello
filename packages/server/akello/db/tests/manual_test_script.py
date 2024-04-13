# used as a local manual test script for testing the database
from akello.db.models_v2.organization import User
from akello.db.models_v2.organization import Organization
from akello.db.models_v2.registry import Registry
from akello.db.models_v2.user import UserRegistryRole

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


