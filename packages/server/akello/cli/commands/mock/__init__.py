from akello.cli.commands.mock.registry import RegistryMock
from akello.cli.commands.mock.user import UserMock
from akello.cli.commands.mock.patient import PatientMock
from faker import Faker

fake = Faker()
Faker.seed(0)


def mock_registry():
    pass