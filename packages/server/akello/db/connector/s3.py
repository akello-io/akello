import aiofiles
import hashlib
import os
import boto3



class Storage():

    def set_item(self, key, value):
        pass

    def get_item(self, key):
        pass


class S3StorageLocal(Storage):

    async def set_item(self, key, value):
        data = await value.read(1024)
        checksum = hashlib.md5(data).hexdigest()
        file_path = '.storage/' + checksum + '.' + key.split('.')[-1]
        async with aiofiles.open(file_path, 'wb') as out_file:
            while content := data:  # async read chunk
                await out_file.write(content)  # async write chunk
        return file_path

    def get_item(self, key):
        file_path = '.storage/' + key
        file = open(file_path, "r")
        return file


class S3Storage(Storage):


    async def set_item(self, key, value):
        resource_bucket = os.getenv('AWS_S3_DOCUMENT_RESOURCE_BUCKET')
        assert resource_bucket != None
        # Create a Secrets Manager client
        session = boto3.resource.Session()
        s3 = session.resource('s3')
        s3.put_object(
            ACL='public-read',
            Bucket=resource_bucket,
            Key=key,
            Body=value
        )

    def get_item(self, key):
        resource_bucket = os.getenv('AWS_S3_DOCUMENT_RESOURCE_BUCKET')
        assert resource_bucket != None
        session = boto3.resource.Session()
        s3 = session.resource('s3')
        return s3.get_object(Bucket=resource_bucket, Key=key)