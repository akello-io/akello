import aiofiles
import hashlib



class Storage():

    is_local = True

    def set_item(self, key, value):
        pass

    def get_item(self, key):
        pass


class S3StorageLocal(Storage):

    is_local = True
        
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
                    