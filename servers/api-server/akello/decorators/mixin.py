from functools import wraps
from typing import List
from pydantic import BaseModel
import importlib


class APIMixin(BaseModel):
    order: str
    plugin: object
    method: str
    args: List[str] = []

def run_plugin(_mixin, **kwargs):
    parameters = {}    
    for arg in _mixin.args:                        
        arg_split = arg.split('.')
        if len(arg_split) > 1:
            module = arg_split[0]                                                        
            parameters[arg_split[-1]] = getattr(kwargs[module], arg_split[-1])
        else:                            
            parameters[arg] = kwargs[arg_split[0]]
    getattr(_mixin.plugin, _mixin.method)(**parameters)


def mixin(*, mixins: List[APIMixin]):    
    def decorator(func):                
        @wraps(func)
        async def wrapper(*args, **kwargs):                    
            # run any pre-mixin plugins                        
            for _mixin in mixins:                
                if _mixin.order == 'pre':                    
                    run_plugin(_mixin, **kwargs)
                                                            
            # run the function                        
            result = await func(*args, **kwargs)
            
            for _mixin in mixins:
                if _mixin.order == 'post':
                    run_plugin(_mixin, **kwargs)
            
            return result
        return wrapper
    return decorator