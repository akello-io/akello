import os

from registry.adapters.dynamodb_query_service import DynamoDBRegistryQueryService


query_service = DynamoDBRegistryQueryService()
patch_registry_query_service = 'registry.adapters.dynamodb_query_service.DynamoDBRegistryQueryService'
patch_unit_of_work = 'registry.adapters.dynamodb_unit_of_work.DynamoDBUnitOfWork'
