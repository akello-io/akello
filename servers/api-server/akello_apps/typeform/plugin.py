import yaml

def convert_typeform_to_phq9(payload: dict):
    #TODO: Need the email to look up the patient
    #TODO: Need to set screening type (done by patient)

    with open("./akello_apps/typeform/screeners/phq9.yaml") as stream:
        try:
            phq9_screener_mapping = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)

    form_response = payload['form_response']
    answers = form_response['answers']
    question_mappings = phq9_screener_mapping['questions']

    total_score = 0
    for question in question_mappings:
        question_id = question['id']
        question_responses = [answer for answer in answers if answer['field']['id'] == question_id]
        choice_id = question_responses[0]['choice']['id']
        for question_mapping in question_mappings:
            if question_mapping['id'] == question_id:
                question_choices = question_mapping['choices']
                for choice in question_choices:
                    if choice['id'] == choice_id:
                        print(choice['label'])
                        print(choice['score'])
                        total_score += choice['score']
                break
