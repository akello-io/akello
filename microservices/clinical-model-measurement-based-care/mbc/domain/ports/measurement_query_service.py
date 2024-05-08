from abc import ABC, abstractmethod
from typing import List
from mbc.domain.model.measurement import Measurement


class MeasurementQueryService(ABC):

    @abstractmethod
    def get_measurement(self, registry_id: str, user_id: str, measurement_id: str, start_date: float, end_date: float) -> List[Measurement]:
        ...