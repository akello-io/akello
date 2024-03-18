import os, logging, yaml
from akello.services import BaseService
from akello.db.models import Measurement

logger = logging.getLogger('mangum')


class ScreenerService(BaseService):

    @staticmethod
    def get_screeners():
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
