from abc import ABC, abstractmethod


class MessageBusService(ABC):

    @abstractmethod
    def send_message(self, message: str) -> None:
        ...