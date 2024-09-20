from typing import Optional, List

from boto3.dynamodb.conditions import Attr

from infra.dynamodb import *
from registry.domain.model.measurement import Measurement
from registry.domain.model.registry import RegistryUser, Registry
from registry.domain.ports.measurement_query_service import MeasurementQueryService
from registry.domain.ports.registry_query_service import RegistryQueryService


AKELLO_DYNAMODB_LOCAL_URL = os.getenv('DYNAMODB_URL')
AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')


class DynamoDBRegistryQueryService(RegistryQueryService):

    def __init__(self):

        if AKELLO_UNIT_TEST:
            # self.client = MagicMock()
            self.dynamodb = MagicMock()
        else:
            # self.client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
            self.dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)

        self.table = self.dynamodb.Table('akello_core')

    def get_registry_user(self, registry_id: str, user_id: str) -> Optional[RegistryUser]:
        response = self.table.get_item(
            Key={
                'partition_key': 'registry-id:%s' % registry_id,
                'sort_key': 'user-id:%s' % user_id
            }
        )
        item = response.get('Item')
        if item:
            return RegistryUser(**item)
        return None

    def get_registry(self, registry_id: str) -> Optional[Registry]:
        response = self.table.get_item(
            Key={
                'partition_key': 'registry-id:%s' % registry_id,
                'sort_key': 'meta'
            }
        )
        item = response.get('Item')
        if item:
            return Registry(**item)
        return None

    def list_registeries(self) -> Optional[List[Registry]]:

        response = self.table.scan(
            FilterExpression=Attr('partition_key').begins_with('registry-id:')
        )

        items = response.get('Items')
        if items:
            return [Registry(**item) for item in items]
        return None


class DynamoDBMeasurementQueryService(MeasurementQueryService):

    def __init__(self):

        if AKELLO_UNIT_TEST:
            # self.client = MagicMock()
            self.dynamodb = MagicMock()
        else:
            # self.client = boto3.client('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)
            self.dynamodb = boto3.resource('dynamodb', endpoint_url=AKELLO_DYNAMODB_LOCAL_URL)

        self.table = self.dynamodb.Table('akello_measurements')


    def get_measurement(self, registry_id: str, user_id: str, measurement_id: str, start_date: float, end_date: float) -> List[Measurement]:
        response = self.table.query(
            KeyConditionExpression=Key('partition_key').eq('user-id:%s' % user_id) & Key('sort_key').between('timestamp:%s' % start_date, 'timestamp:%s' % end_date)
        )
        items = response.get('Items')
        return [Measurement(**item) for item in items]
