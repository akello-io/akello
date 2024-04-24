from abc import ABC, abstractmethod
from typing import Optional, List

from policy.domain.model.aws_policy import AWSPolicy


class UserPolicyQueryService(ABC):

    @abstractmethod
    def get(self, user_id: str) -> Optional[AWSPolicy]:
        ...

    @abstractmethod
    def set(self, policy: AWSPolicy) -> None:
        ...

    @abstractmethod
    def create(self, policy: AWSPolicy) -> None:
        ...
