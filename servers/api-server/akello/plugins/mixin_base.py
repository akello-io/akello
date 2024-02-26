from enum import Enum, IntEnum
from pydantic import BaseModel


class MixinType(str, Enum):
    pre_webhook = 'Pre Webhook'
    post_webhook = 'Post Webhook'



class BaseMixin(BaseModel):

    type: str

    def __init__(self, *args, **kwargs):
        pass


class PreWebHookMixinBase(BaseMixin):

    type: MixinType = MixinType.pre_webhook

    def run(self, data):
        raise NotImplementedError('run() must be implemented in a subclass')
    

class PostWebHookMixinBase(BaseMixin):

    type: MixinType = MixinType.post_webhook
    
    def run(self, data):
        raise NotImplementedError('run() must be implemented in a subclass')

class PatientMixinBase(BaseMixin):

    def run(self, patient):
        raise NotImplementedError('run() must be implemented in a subclass')
