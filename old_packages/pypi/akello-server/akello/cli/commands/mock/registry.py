from akello.cli.commands.mock.user import UserMock
from faker import Faker

fake = Faker()
Faker.seed(0)


class RegistryMock:

    def create_registry(self, name: str, description: str, questionnaires, logo_url: str = None):
        pass

    def add_user(self, user: UserMock):
        pass
