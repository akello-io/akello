from abc import ABC, abstractmethod
from typing import Optional, List
from mbc.domain.model.registry import RegistryUser


class RegistryQueryService(ABC):

    @abstractmethod
    def add_registry_user(self, registry_user: RegistryUser) -> Optional[RegistryUser]:
        ...
