from mbc.domain.commands.measurement.add_measurement_command import AddMeasurementCommand
from decimal import Decimal
from datetime import datetime, timezone

from mbc.domain.commands.registry_management.add_user_to_registry_command import AddUserToRegistryCommand
from mbc.domain.model.registry import RegistryUser
from mbc.domain.model.measurement import Measurement
from mbc.domain.ports import unit_of_work
from decimal import Decimal

def handle_add_measurement_command(
    command: AddMeasurementCommand,
    unit_of_work: unit_of_work.UnitOfWork
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())

    measurement = Measurement(
        measurement_id=command.measurement_id,
        registry_id=command.registry_id,
        user_id=command.user_id,
        label=command.label,
        value=command.value,
        measured_at=command.measured_at,
        created_at=timestamp
    )

    with unit_of_work:
        unit_of_work.measurement.add(measurement)
        unit_of_work.commit()

    return True
