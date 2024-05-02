import os

from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService
from mbc.adapters.redis_query_service import RedisDBRegistryQueryService

if os.getenv("QUERY_SERVICE_HOST") == 'dynamodb':
    query_service = DynamoDBRegistryQueryService()
    patch_query_service = 'mbc.adapters.dynamodb_query_service.DynamoDBRegistryQueryService'
else:
    query_service = RedisDBRegistryQueryService()
    patch_query_service = 'mbc.adapters.redis_query_service.RedisDBRegistryQueryService'
