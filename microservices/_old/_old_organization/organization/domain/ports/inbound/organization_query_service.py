from abc import ABC, abstractmethod
from typing import Optional

from _old_organization.domain.model.organization import Organization


class OrganizationQueryService(ABC):

    @abstractmethod
    def get(self, organization_id: str) -> Optional[Organization]:
        ...

    @abstractmethod
    def set(self, organization: Organization) -> None:
        ...

    @abstractmethod
    def create(self, organization: Organization) -> None:
        ...

    @abstractmethod
    def invite_user(self, organization_id: str, email: str) -> None:
        ...
