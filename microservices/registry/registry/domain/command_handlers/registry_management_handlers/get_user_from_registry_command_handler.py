from typing import Optional

from registry.domain.ports.registry_query_service import RegistryQueryService
from registry.domain.commands.registry_management.get_user_from_registry_command import GetUserFromRegistryCommand
from registry.domain.model.registry import RegistryUser


def handle_get_user_from_registry_command(
        command: GetUserFromRegistryCommand,
        patient_query_service: RegistryQueryService,
) -> Optional[RegistryUser]:
    return patient_query_service.get_registry_user(command.registry_id, command.user_id)
