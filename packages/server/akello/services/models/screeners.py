import logging
import os
import yaml

from akello.db.models import Measurement
from akello.services import BaseService

logger = logging.getLogger('mangum')


class ScreenerService(BaseService):

    @staticmethod
    def get_screeners():
        """
        Get all screeners from the screener's directory. The client will present to the user to select which screener they want active in a registry.
        Returns: list of screeners
        """
        measurement_list = []
        measurements = os.listdir('akello/screeners/measurements')
        for measurement in measurements:
            if measurement.endswith('.yaml'):
                with open(f'akello/screeners/measurements/{measurement}') as f:
                    try:
                        mobj = Measurement(**yaml.safe_load(f))
                        measurement_list.append(mobj)
                    except yaml.YAMLError as exc:
                        print(exc)
        return measurement_list
