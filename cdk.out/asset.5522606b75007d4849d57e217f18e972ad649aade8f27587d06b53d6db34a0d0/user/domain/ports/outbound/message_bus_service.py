from abc import ABC, abstractmethod
from typing import Optional

from user.domain.model.user import User


class MessageBusService(ABC):

    @abstractmethod
    def send_message(self, message: str) -> None:
        ...