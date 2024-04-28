class HasConcentedCondition:
    patient_id: str
    patient_query_service: any

    def __init__(self, patient_id, patient_query_service):
        self.patient_id = patient_id
        self.patient_query_service = patient_query_service


def has_concented_condition_handler(*args, **kwargs) -> bool:
    # query patient assessments where assessment name matches the input assessment name
    # for each assessment, check if it matches the conditions
    print(f"Checking completed assessment condition... {args} {kwargs}")
    return True
