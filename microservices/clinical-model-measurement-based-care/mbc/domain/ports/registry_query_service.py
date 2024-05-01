from abc import ABC, abstractmethod
from typing import Optional, List
from mbc.domain.model.registry import RegistryUser, Registry


class RegistryQueryService(ABC):

    @abstractmethod
    def add_registry_user(self, registry_user: RegistryUser) -> Optional[RegistryUser]:
        ...

    @abstractmethod
    def get_registry_user(self, registry_id: str, user_id: str) -> Optional[RegistryUser]:
        ...

    @abstractmethod
    def create_registry(self, registry: Registry) -> Optional[Registry]:
        ...

    @abstractmethod
    def get_registry(self, registry_id: str) -> Optional[Registry]:
        ...

    @abstractmethod
    def update_registry(self, registry: Registry) -> Optional[Registry]:
        ...