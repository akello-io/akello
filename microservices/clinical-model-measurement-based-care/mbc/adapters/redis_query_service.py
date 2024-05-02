import redis
import json
import os
from mbc.domain.model.registry import RegistryUser, Registry
from mbc.domain.ports.registry_query_service import RegistryQueryService
from decimal import Decimal
from unittest.mock import MagicMock

AKELLO_UNIT_TEST = os.getenv('AKELLO_UNIT_TEST')


if AKELLO_UNIT_TEST:
    #client = MagicMock()
    r = MagicMock()
else:
    r = redis.Redis(host='host.docker.internal', port=6379, decode_responses=True)

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o)
        return super().default(o)

class RedisDBRegistryQueryService(RegistryQueryService):

    def create_registry(self, registry: Registry) -> Registry | None:
        super().create_registry(registry)
        key = f"registry:{registry.id}"
        value = json.dumps(registry.dict(), cls=DecimalEncoder)
        r.set(key, value)
        return registry

    def add_registry_user(self, registry_user: RegistryUser) -> RegistryUser | None:
        super().add_registry_user(registry_user)
        key = f"registry_user:{registry_user.registry_id}:{registry_user.user_id}"
        value = json.dumps(registry_user.dict(), cls=DecimalEncoder)
        r.set(key, value)
        return registry_user

    def get_registry_user(self, registry_id: str, user_id: str) -> RegistryUser | None:
        super().get_registry_user(registry_id, user_id)
        key = f"registry_user:{registry_id}:{user_id}"
        data = r.get(key)
        return RegistryUser(**json.loads(data))

    def get_registry(self, registry_id: str) -> Registry | None:
        super().get_registry(registry_id)
        key = f"registry:{registry_id}"
        data = r.get(key)
        return Registry(**json.loads(data))

    def update_registry(self, registry: Registry) -> Registry | None:
        super().update_registry(registry)
        key = f"registry:{registry.registry_id}"
        value = json.dumps(registry.dict(), cls=DecimalEncoder)
        r.set(key, value)
        return registry