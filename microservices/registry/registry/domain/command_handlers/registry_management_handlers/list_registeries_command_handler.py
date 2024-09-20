from typing import Optional

from registry.domain.ports.registry_query_service import RegistryQueryService
from registry.domain.commands.registry_management.list_registeries_command import ListRegisteriesCommand
from registry.domain.model.registry import RegistryUser


def handle_list_registeries_command(
        command: ListRegisteriesCommand,
        patient_query_service: RegistryQueryService,
) -> Optional[RegistryUser]:
    return patient_query_service.list_registeries()
