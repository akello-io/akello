import os, random
from akello.cli.commands.mock.registry import RegistryMock
from akello.cli.commands.mock.user import UserMock
from akello.cli.commands.mock.patient import PatientMock
from akello.services.models.screeners import ScreenerService
from akello.services.models.user import UserService
from akello.services.models.registry import RegistryService
from akello.db.connector.dynamodb import client, dynamodb
from akello.db.models_old import UserRole
from akello.db.types import UserInvite
from akello.cli.commands.setup import set_local_env
from faker import Faker

fake = Faker()
Faker.seed(0)


def mock_registry():
    pass