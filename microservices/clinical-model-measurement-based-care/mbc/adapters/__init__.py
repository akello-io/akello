import os

from mbc.adapters.dynamodb_query_service import DynamoDBRegistryQueryService


query_service = DynamoDBRegistryQueryService()
patch_registry_query_service = 'mbc.adapters.dynamodb_query_service.DynamoDBRegistryQueryService'
patch_unit_of_work = 'mbc.adapters.dynamodb_unit_of_work.DynamoDBUnitOfWork'
