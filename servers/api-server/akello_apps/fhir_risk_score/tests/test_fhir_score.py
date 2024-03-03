
import json
from unittest import TestCase
from akello_apps.fhir_risk_score.plugin import FHIRRiskScorePlugin

class TestFHIRScore(TestCase):

    def test_andrea_jenkins_score(self):
        with open('akello_apps/fhir_risk_score/tests/synthea_data_andrea_jenkins.json') as f:
            fhir_bundle = json.load(f)

        score_parameters = [
            {
                'name': 'Education',
                'query': 'condition_query',
                'conditions': [
                    {
                        'code': '224295006',
                        'diagnosis': 'High school education'
                    }
                ],
                'weight': 1
            }
        ]
        score = FHIRRiskScorePlugin.score(fhir_bundle, score_parameters)
        self.assertEqual(score, {'Education': 1})


