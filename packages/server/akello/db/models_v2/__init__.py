from botocore.exceptions import ClientError
from pydantic import BaseModel
import datetime
from akello.db.connector.dynamodb import registry_db


class AkelloBaseModel(BaseModel):

    @property
    def created_at(self) -> float:
        return datetime.datetime.utcnow().timestamp()

    @property
    def modified_at(self) -> float:
        return datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return '%s:%s' % (self.object_type, self.id)

    def get(self):
        try:
            response = registry_db.get_item(
                Key={'partition_key': self.partition_key, 'sort_key': self.sort_key})
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        if 'Item' not in response:
            return None

        return response['Item']

    def put(self):
        response = registry_db.put_item(
            Item={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key,
                **self.dict()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    def set_attribute(self, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = :value"
        ExpressionAttributeValues = {
            ':value': attribute_value
        }
        response = registry_db.update_item(
            Key={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeValues=ExpressionAttributeValues,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    def append_to_attribute(self, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = list_append(#att_name, :%s)" % attribute_name
        ExpressionAttributeValues = {
            ':%s' % attribute_name: [attribute_value],
        }
        response = registry_db.update_item(
            Key={
                'partition_key': 'registry-patient:%s' % self.partition_key,
                'sort_key': self.sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ExpressionAttributeValues=ExpressionAttributeValues,
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    def add_attribute(self, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = :value"
        ExpressionAttributeValues = {
            ':value': attribute_value
        }
        response = registry_db.update_item(
            Key={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeValues=ExpressionAttributeValues,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
