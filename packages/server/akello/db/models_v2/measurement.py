import uuid

from akello.db.models_v2 import AkelloBaseModel


class Measurement(AkelloBaseModel):
    id: str = str(uuid.uuid4())
    name: str
    organization_id: str = None

    @property
    def object_type(self) -> str:
        return 'measurement'

    @property
    def sort_key(self) -> str:
        return 'meta'


class MeasurementQuestion(AkelloBaseModel):
    id: str = str(uuid.uuid4())
    measurement_id: str
    question: str
    question_type: str

    @property
    def object_type(self) -> str:
        return 'measurement-question'

    @property
    def sort_key(self) -> str:
        return 'meta'


class MeasurementQuestionOption(AkelloBaseModel):
    id: str = str(uuid.uuid4())
    question_id: str
    option: str

    @property
    def object_type(self) -> str:
        return 'measurement-question-option'

    @property
    def sort_key(self) -> str:
        return 'meta'
