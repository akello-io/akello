import logging

from fastapi import APIRouter

from infra.dynamodb import dynamodb as dynamodb_client
from registry.adapters import dynamodb_unit_of_work
from registry.domain.command_handlers.measurement.add_measurement_command_handler import handle_add_measurement_command
from registry.domain.commands.measurement.add_measurement_command import AddMeasurementCommand
from registry.entrypoints.api import config

logger = logging.getLogger('mangum')
router = APIRouter()

unit_of_work = dynamodb_unit_of_work.DynamoDBUnitOfWork(
    config.AppConfig.get_table_name(), dynamodb_client.meta.client
)


@router.post("/")
async def add_measurement(registry_id: str, patient_id: str, measurement: dict):
    handle_add_measurement_command(
        command=AddMeasurementCommand(
            measurement_id=measurement['measurement_id'],
            registry_id=registry_id,
            user_id=patient_id,
            value=measurement['value'],
            measured_at=measurement['measured_at']
        ),
        unit_of_work=unit_of_work
    )


## get by what? must have measureId,
## get list of registry id , patient_id
@router.get("/")
async def get_measurements(registry_id: str, patient_id: str, start_date: str = None, end_date: str = None):
    pass


@router.get("/{type}")
async def get_measurement(registry_id: str, patient_id: str, type: str, start_date: str = None, end_date: str = None):
    pass
