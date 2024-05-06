import logging
from mbc.domain.command_handlers.measurement.add_measurement_command_handler import handle_add_measurement_command
from mbc.domain.commands.measurement.add_measurement_command import AddMeasurementCommand
from mbc.adapters import dynamodb_unit_of_work
from infra.dynamodb import dynamodb as dynamodb_client
from mbc.entrypoints.api import config


from fastapi import APIRouter

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
            label=measurement['label'],
            value=measurement['value'],
            measured_at=measurement['measured_at']
        ),
        unit_of_work=unit_of_work
    )



@router.get("/")
async def get_measurements(registry_id: str, patient_id: str, type: str, start_date: str=None, end_date: str=None):
    pass

@router.get("/{type}")
async def get_measurement(registry_id: str, patient_id: str, type: str, start_date: str=None, end_date: str=None):
    pass