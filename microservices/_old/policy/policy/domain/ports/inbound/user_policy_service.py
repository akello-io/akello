from abc import ABC, abstractmethod
from typing import Optional, List

from microservices.policy.policy.domain.model.policy import Policy


class UserPolicyService(ABC):

    @abstractmethod
    def create(self, policy: Policy) -> None:
        ...
