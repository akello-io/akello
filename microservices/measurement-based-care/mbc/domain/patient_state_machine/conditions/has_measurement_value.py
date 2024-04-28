def has_measurement_value(*args, **kwargs):
    assessment_name = kwargs.get('assessment_name')
    assessment_value_gte = kwargs.get('assessment_value_gte')
    assessment_value_lte = kwargs.get('assessment_value_lte')
    assessment_value_eq = kwargs.get('assessment_value_eq')
    # query patient assessments where assessment name matches the input assessment name
    print(f'Querying patient assessments where assessment name matches {assessment_name}')
    print(f'Checking if the assessment value is greater than or equal to {assessment_value_gte}')
    print(f'Checking if the assessment value is less than or equal to {assessment_value_lte}')
    print(f'Checking if the assessment value is equal to {assessment_value_eq}')

    return True
