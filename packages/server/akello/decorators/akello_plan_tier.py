from akello.db.types import AkelloPlanTier
from functools import wraps
from typing import List


def akello_plan_check(*, tiers: List[AkelloPlanTier]):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # TODO: Needs to be implemented

            """

            if 'registry_id' not in kwargs:
                raise Exception('registry_id is required')
                    
            if 'free' not in tiers:
                raise Exception('free tier is required')
            """

            result = await func(*args, **kwargs)

            return result

        return wrapper

    return decorator
