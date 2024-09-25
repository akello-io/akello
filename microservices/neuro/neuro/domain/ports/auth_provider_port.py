from abc import ABC, abstractmethod

class AuthProviderPort(ABC):
    @abstractmethod
    def register_service(self, app_client_name: str) -> dict:
        pass
