from akello_apps.base import CorePluginMixin
from jsonpath_ng import jsonpath
from jsonpath_ng.ext import parse


def condition_exists(data, path, conditions):
    matches = parse(path).find(data)
    for match in matches:
        if 'code' in match.value and match.value['code'] in conditions:
            return True
    return False


family_history_condition_query = '$.entry[*][?(resourceType=="FamilyMemberHistory")].condition[*].code.coding[*]'
condition_query = '$.entry[*][?(resourceType=="Condition")].code.coding[*]'
related_person_query = '$.entry[*][?(resourceType=="RelatedPerson")].relationship[*].coding[*]'
procedure_query = '$.entry[*][?(resourceType=="Procedure")].code.coding[*]'
medication_request_query = '$.entry[*][?(resourceType=="MedicationRequest")].medicationCodeableConcept.coding[*]'

queries = {
    'family_history_condition_query': family_history_condition_query,
    'condition_query': condition_query,
    'related_person_query': related_person_query,
    'procedure_query': procedure_query,
    'medication_request_query': medication_request_query
}


class FHIRRiskScorePlugin(CorePluginMixin):
    title = "FHIR Risk Score"
    slug = "fhir_risk_score"
    description = "xxx"
    conf_key = "fhir_risk_score"

    @staticmethod
    def score(fhir_bundle, score_parameters):
        scores = {}
        for score_parameter in score_parameters:
            conditions = [condition['code'] for condition in score_parameter['conditions']]
            if condition_exists(fhir_bundle, queries[score_parameter['query']], conditions):
                scores[score_parameter['name']] = score_parameter['weight']
        return scores
