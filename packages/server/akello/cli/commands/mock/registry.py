from akello.cli.commands.mock.user import UserMock
from akello.services.models.registry import RegistryService
from akello.services.models.user import UserService
from faker import Faker

fake = Faker()
Faker.seed(0)


class RegistryMock:

    def create_registry(self, name: str, description: str, questionnaires, logo_url: str = None):
        return RegistryService.create_registry(
            name=name,
            description=description,
            questionnaires=questionnaires,
            integrations=[],
            logo_url=logo_url
        )

    def add_user(self, user: UserMock):
        UserService.link_user_to_registry(user.cognito_user_id, self.id)
        RegistryService.update_stats(self.id)
