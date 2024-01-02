from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
from akello.dynamodb import dynamodb
from akello.dynamodb.models.financial_model import FinancialModel
from decimal import Decimal
import json


def create_object(table, partition_key, sort_key, data):
    response = table.put_item(
        Item={
            "partition_key": partition_key,
            "sort_key": sort_key,
            "data": data
        }
    )
    return response


def get_object(table, partition_key, sort_key=None):
    try:
        print('partition-key: %s -- sort-key: %s' % (partition_key, sort_key))
        if sort_key:
            response = table.query(
                KeyConditionExpression=Key('partition_key').eq(partition_key)
                                       & Key('sort_key').eq(sort_key)
            )
        else:
            response = table.query(
                KeyConditionExpression=Key('partition_key').eq(partition_key)
            )
    except ClientError as e:
        print(e)
        print(e.response['No item found'])
    else:
        return response['Items']


class FinancialModelQuery:
    table = 'Registry'

    def __init__(self):
        self.table = dynamodb.Table(self.table)

    def create_model(self, model: FinancialModel):
        item = dict(model)
        item = json.loads(json.dumps(item), parse_float=Decimal)

        item['partition_key'] = model.partition_key
        item['sort_key'] = model.sort_key

        response = self.table.put_item(
            Item=item
        )

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    def list(self, user_id: str):
        partition_key = 'financial_model:' + user_id
        models = get_object(self.table, partition_key)

        financial_models = []
        for model in models:
            try:
                financial_models.append(FinancialModel(**model))
            except Exception as e:
                print('unable to load model for partition_id: %s and sort_key: %s' % (
                    model['partition_key'], model['sort_key']))

        return get_object(self.table, partition_key)

    def get(self, user_id: str, model_name: str):
        partition_key = 'financial_model:' + user_id
        sort_key = model_name
        models = get_object(self.table, partition_key=partition_key, sort_key=sort_key)

        financial_models = []
        for model in models:
            try:
                financial_models.append(FinancialModel(**model))
            except Exception as e:
                print('unable to load model for partition_id: %s and sort_key: %s' % (
                    model['partition_key'], model['sort_key']))
        return get_object(self.table, partition_key, model_name)
