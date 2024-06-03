from abc import ABC, abstractmethod
import typing
from account.domain.model.user import User
from account.domain.model.organization import Organization


class UserRepository(ABC):

    @abstractmethod
    def create(self, user: User) -> None:
        ...

    @abstractmethod
    def update_attributes(self, user_id: str, **kwargs) -> None:
        ...

    @abstractmethod
    def get(self, user_id: str) -> User:
        ...

    @abstractmethod
    def delete(self, user_id: str) -> None:
        ...


class OrganizationRepository(ABC):

    @abstractmethod
    def create(self, organization: Organization) -> None:
        ...

    @abstractmethod
    def update_attributes(self, uorganization_id: str, **kwargs) -> None:
        ...

    @abstractmethod
    def get(self, uorganization_id: str) -> Organization:
        ...

    @abstractmethod
    def delete(self, organization_id: str) -> None:
        ...


class UnitOfWork(ABC):
    user: UserRepository
    organization: OrganizationRepository

    @abstractmethod
    def commit(self) -> None:
        ...

    @abstractmethod
    def __enter__(self) -> typing.Any:
        ...

    @abstractmethod
    def __exit__(self, *args) -> None:
        ...
