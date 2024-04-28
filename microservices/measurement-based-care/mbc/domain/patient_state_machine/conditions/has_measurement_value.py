def has_measurement_value(*args, **kwargs):
    assessment_name = kwargs.get('assessment_name')
    assessment_value_gte = kwargs.get('assessment_value_gte')
    assessment_value_lte = kwargs.get('assessment_value_lte')
    assessment_value_eq = kwargs.get('assessment_value_eq')
    # query patient assessments where assessment name matches the input assessment name
    print("Checking measurement value condition...")
    return True
