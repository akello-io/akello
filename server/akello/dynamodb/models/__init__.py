from pydantic import BaseModel
from akello.dynamodb import registry_db


class RegistryDBBaseModel(BaseModel):

    @property
    def partition_key(self) -> str:
        return '%s:%s' % (self.object_type, self.id)

    @staticmethod
    def set_attribute(partition_key, sort_key, attribute_name: str, attribute_value: any):
        UpdateExpression = "SET #att_name = :value"
        ExpressionAttributeValues = {
            ':value': attribute_value
        }
        response = registry_db.update_item(
            Key={
                'partition_key': partition_key,
                'sort_key': sort_key
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

    @staticmethod
    def append_to_attribute(partition_key, sort_key, attribute_name: str, attribute_value: any):
        # TODO: We should make sure any append to list use this, only if we are just appending to a list

        UpdateExpression = "SET #att_name = list_append(#att_name, :%s)" % attribute_name
        ExpressionAttributeValues = {
            ':%s' % attribute_name: [attribute_value],
        }
        response = registry_db.update_item(
            Key={
                'partition_key': 'registry-patient:%s' % partition_key,
                'sort_key': sort_key
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
