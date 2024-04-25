from abc import ABC, abstractmethod
from typing import Optional

from _old_user.domain.model.user import User


class MessageBusService(ABC):

    @abstractmethod
    def send_message(self, message: str) -> None:
        ...