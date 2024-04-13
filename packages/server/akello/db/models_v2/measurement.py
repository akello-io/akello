import uuid

from akello.db.models_v2 import AkelloBaseModel


class Measurement(AkelloBaseModel):
    id: str
    name: str
    organization_id: str = None

    def __init__(self, **data):
        super().__init__(
            id=str(uuid.uuid4()),
            **data
        )

    @property
    def object_type(self) -> str:
        return 'measurement'

    @property
    def sort_key(self) -> str:
        return 'meta'


class MeasurementQuestion(AkelloBaseModel):
    id: str
    measurement_id: str
    question: str
    question_type: str

    def __init__(self, **data):
        super().__init__(
            id=str(uuid.uuid4()),
            **data
        )

    @property
    def object_type(self) -> str:
        return 'measurement-question'

    @property
    def sort_key(self) -> str:
        return 'meta'


class MeasurementQuestionOption(AkelloBaseModel):
    id: str
    question_id: str
    option: str

    def __init__(self, **data):
        super().__init__(
            id=str(uuid.uuid4()),
            **data
        )

    @property
    def object_type(self) -> str:
        return 'measurement-question-option'

    @property
    def sort_key(self) -> str:
        return 'meta'
