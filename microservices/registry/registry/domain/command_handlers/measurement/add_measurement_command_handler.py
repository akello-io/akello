from datetime import datetime, timezone
from decimal import Decimal

from registry.domain.commands.measurement.add_measurement_command import AddMeasurementCommand
from registry.domain.model.measurement import Measurement
from registry.domain.ports import unit_of_work


def handle_add_measurement_command(
        command: AddMeasurementCommand,
        unit_of_work: unit_of_work.UnitOfWork
) -> bool:
    timestamp = Decimal(datetime.now(timezone.utc).timestamp())

    measurement = Measurement(
        measurement_id=command.measurement_id,
        registry_id=command.registry_id,
        user_id=command.user_id,
        value=command.value,
        measured_at=command.measured_at,
        created_at=timestamp
    )

    with unit_of_work:
        unit_of_work.measurement.add(measurement)
        unit_of_work.commit()

    return True
