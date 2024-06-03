from pydantic import BaseModel


class HasCompletedAssessmentCondition:
    patient_id: str
    patient_query_service: any
    assessment_name: str
    date_completed_by: int = None
    assessment_value_lte: int = None
    assessment_value_gte: int = None
    assessment_value_eq: int = None

    def __init__(self, patient_id, patient_query_service, assessment_name, date_completed_by=None,
                 assessment_value_lte=None, assessment_value_gte=None, assessment_value_eq=None):
        self.patient_id = patient_id
        self.patient_query_service = patient_query_service
        self.assessment_name = assessment_name
        self.date_completed_by = date_completed_by
        self.assessment_value_lte = assessment_value_lte
        self.assessment_value_gte = assessment_value_gte
        self.assessment_value_eq = assessment_value_eq


def has_completed_assessment_condition_handler(condition: HasCompletedAssessmentCondition) -> bool:
    # query patient assessments where assessment name matches the input assessment name
    # for each assessment, check if it matches the conditions
    print("Checking completed assessment condition...")
    return True
