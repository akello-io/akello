from abc import ABC, abstractmethod
from typing import Optional, List
from registry.domain.model.registry import RegistryUser, Registry


class RegistryQueryService(ABC):

    @abstractmethod
    def get_registry_user(self, registry_id: str, user_id: str) -> Optional[RegistryUser]:
        ...

    @abstractmethod
    def get_registry(self, registry_id: str) -> Optional[Registry]:
        ...
