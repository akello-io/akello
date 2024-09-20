import logging

from fastapi import APIRouter

from registry.adapters import dynamodb_unit_of_work
from registry.adapters import query_service
from registry.domain.command_handlers.registry_management_handlers.create_registry_command_handler import \
    handle_create_registry_command
from registry.domain.command_handlers.registry_management_handlers.get_registry_command_handler import \
    handle_get_registry_command
from registry.domain.command_handlers.registry_management_handlers.update_registry_command_handlers import \
    handle_update_registry_command
from registry.domain.command_handlers.registry_management_handlers.list_registeries_command_handler import \
    handle_list_registeries_command
from registry.domain.commands.registry_management.create_registry_command import CreateRegistryCommand
from registry.domain.commands.registry_management.get_registry_command import GetRegistryCommand
from registry.domain.commands.registry_management.update_registry_command import UpdateRegistryCommand
from registry.domain.commands.registry_management.list_registeries_command import ListRegisteriesCommand
from registry.entrypoints.api import config
from registry.entrypoints.api.v1.models.create_registry import CreateRegistry
from registry.entrypoints.api.v1.models.update_registry import UpdateRegistry

logger = logging.getLogger('mangum')

router = APIRouter()
app_config = config.AppConfig(**config.config)

from infra.dynamodb import dynamodb as dynamodb_client

unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)

@router.post("/")
async def create(registry: CreateRegistry):
    command = CreateRegistryCommand(
        name=registry.name,
        description=registry.description
    )
    ret = handle_create_registry_command(
        command=command,
        unit_of_work=unit_of_work)
    return ret

@router.get("/")
async def list():
    """
    Test13 Handles the GET request to list all registries the user has access to.

    Returns:
        List of Registry objects the user has access to.
    """
    commnad = ListRegisteriesCommand()
    ret = handle_list_registeries_command(
        command=commnad,
        patient_query_service=query_service
    )
    return ret


@router.get("/{registry_id}")
async def get(registry_id: str):
    """
    Retrieve a registry by its ID.

    Args:
        registry_id (str): The unique identifier of the registry.

    Returns:
        dict: The registry details.

    Raises:
        HTTPException: If the registry is not found or an error occurs during retrieval.
    """
    command = GetRegistryCommand(registry_id=registry_id)
    registry = handle_get_registry_command(
        command=command,
        patient_query_service=query_service
    )
    return registry


@router.put("/{registry_id}")
async def update(update_registry: UpdateRegistry, registry_id: str):
    """
    Update a registry entry.

    This endpoint allows updating an existing registry entry with the provided details.

    Args:
        update_registry (UpdateRegistry): The updated registry details.
        registry_id (str): The unique identifier of the registry to be updated.

    Returns:
        None
    """
    command = UpdateRegistryCommand(
        registry_id=registry_id,
        name=update_registry.name,
        description=update_registry.description,
    )
    handle_update_registry_command(
        command=command,
        unit_of_work=unit_of_work
    )
    return {"message": "Registry updated successfully"}
