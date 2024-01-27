from functools import wraps
from typing import List

def mixin(*, mixins: List[str]):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            print(mixins)
            for _mixin in mixins:
                for plugin in getattr(kwargs['request'].app.state, _mixin):
                    plugin().run(*args, **kwargs)
            return await func(*args, **kwargs)
        return wrapper
    return decorator