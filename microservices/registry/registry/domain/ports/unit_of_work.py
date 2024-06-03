import typing
from abc import ABC, abstractmethod

from registry.domain.model.registry import Registry, RegistryUser
from registry.domain.model.measurement import Measurement


class RegistryRepository(ABC):

    @abstractmethod
    def create(self, registry: Registry) -> None:
        ...

    @abstractmethod
    def update_attributes(self, registry_id: str, **kwargs) -> None:
        ...

    @abstractmethod
    def get(self, registry_id: str) -> Registry:
        ...

    @abstractmethod
    def delete(self, registry_id: str) -> None:
        ...


class RegistryUserRepository(ABC):

    @abstractmethod
    def add(self, registry_user: RegistryUser) -> None:
        ...

    @abstractmethod
    def update_attributes(self, registry_id: str, user_id: str, **kwargs) -> None:
        ...

    @abstractmethod
    def delete(self, registry_id: str, user_id: str) -> None:
        ...


class MeasurementRepository(ABC):

    @abstractmethod
    def add(self, measurement: Measurement) -> None:
        ...

    @abstractmethod
    def update_attributes(self, measurement_id: str, **kwargs) -> None:
        ...

    @abstractmethod
    def delete(self, measurement_id: str) -> None:
        ...


class UnitOfWork(ABC):
    registry: RegistryRepository
    registry_user: RegistryUserRepository
    measurement: MeasurementRepository

    @abstractmethod
    def commit(self) -> None:
        ...

    @abstractmethod
    def __enter__(self) -> typing.Any:
        ...

    @abstractmethod
    def __exit__(self, *args) -> None:
        ...