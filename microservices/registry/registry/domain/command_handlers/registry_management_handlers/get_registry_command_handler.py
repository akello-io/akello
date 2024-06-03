from typing import Optional

from registry.domain.ports.registry_query_service import RegistryQueryService
from registry.domain.commands.registry_management.get_registry_command import GetRegistryCommand
from registry.domain.model.registry import RegistryUser


def handle_get_registry_command(
        command: GetRegistryCommand,
        patient_query_service: RegistryQueryService,
) -> Optional[RegistryUser]:
    return patient_query_service.get_registry(command.registry_id)
