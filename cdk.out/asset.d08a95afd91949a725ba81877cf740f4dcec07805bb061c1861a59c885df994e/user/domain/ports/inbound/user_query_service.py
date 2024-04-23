from abc import ABC, abstractmethod
from typing import Optional

from user.domain.model.user import User


class UserQueryService(ABC):

    @abstractmethod
    def get(self, user_id: str) -> Optional[User]:
        ...

    @abstractmethod
    def set(self, user: User) -> None:
        ...

    @abstractmethod
    def create(self, user: User) -> None:
        ...