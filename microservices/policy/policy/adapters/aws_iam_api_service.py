from typing import Optional
import logging

from policy.domain.ports.inbound import user_policy_query_service

class IAMService(user_policy_query_service.UserQueryService):

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def get(self, user_id: str) -> Optional[str]:
        self.logger.info(f"Getting policy for user {user_id}")
        return "policy"

    def set(self, policy: str) -> None:
        self.logger.info(f"Setting policy {policy}")

    def create(self, policy: str) -> None:
        self.logger.info(f"Creating policy {policy}")