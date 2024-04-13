import datetime

from botocore.exceptions import ClientError
from pydantic import BaseModel

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
        # partition_key = '<object_type>:<id>'
        raise Exception("partition_key method not implemented")

    @staticmethod
    def get_by_key(partition_key: str, sort_key: str):
        try:
            response = registry_db.get_item(
                Key={'partition_key': partition_key, 'sort_key': sort_key})
        except ClientError as e:
            print(e)
            print(e.response['No item found'])

        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

        if 'Item' not in response:
            return None

        return response['Item']

    def __get(self):
        """
        Protected method to get the item from the database
        """

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

        for key, value in response['Item'].items():
            try:
                setattr(self, key, value)
            except AttributeError:
                pass

        return self

    def __put(self):
        """
        Protected method to put the item in the database
        """
        response = registry_db.put_item(
            Item={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key,
                **self.model_dump()
            }
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200

    def __set_attribute(self, attribute_name: str, attribute_value: any):
        """
        Protected method to set an attribute in the database
        """

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

    def __append_to_attribute(self, attribute_name: str, attribute_value: any):
        """
        Protected method to append to an attribute in the database
        """

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

    def __add_attribute(self, attribute_name: str, attribute_value: any):
        """
        Protected method to add an attribute in the database
        """

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

    def __remove_attribute(self, attribute_name: str):
        """
        Protected method to remove an attribute in the database
        """

        UpdateExpression = "REMOVE #att_name"
        response = registry_db.update_item(
            Key={
                'partition_key': self.partition_key,
                'sort_key': self.sort_key
            },
            UpdateExpression=UpdateExpression,
            ExpressionAttributeNames={
                "#att_name": attribute_name
            },
            ReturnValues="UPDATED_NEW"
        )
        status_code = response['ResponseMetadata']['HTTPStatusCode']
        assert status_code == 200
