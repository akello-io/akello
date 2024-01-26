import datetime, random, uuid, json
from decimal import Decimal
from akello.dynamodb.models.registry import RegistryModel, ContactTypes, TreatmentLog, PatientRegistry
from akello.services import BaseService
from akello.services.registry import RegistryService
from datetime import datetime


import logging
logger = logging.getLogger('mangum')


class ReportsService(BaseService):

    @staticmethod
    def get_billing_report(registry_id, from_date, to_date):
        logger.info('running report for registry: %s from: %s to: %s' % (registry_id, from_date, to_date))
        patients = RegistryService.get_patients(registry_id)
        patient_report = {
            'monthly': {

            },
            'patients': {

            }
        }
        for patient in patients:
            mrn = patient['patient_mrn']
            if mrn not in patient_report:
                patient_report['patients'][mrn] = {
                    'minute_stats': {},
                    'info': patient
                }

            for treatment_log in patient['treatment_logs']:
                t = TreatmentLog(**treatment_log)
                utc_dt = datetime.utcfromtimestamp(t.date / 1000)
                if not (utc_dt.timestamp() >= from_date and utc_dt.timestamp() <= to_date):
                    continue
                year = utc_dt.year
                month = utc_dt.month
                utc_dt_str = '%s-%s' % (year, month)

                if utc_dt_str not in patient_report['patients'][mrn]['minute_stats']:
                    patient_report['patients'][mrn]['minute_stats'][utc_dt_str] = 0
                patient_report['patients'][mrn]['minute_stats'][utc_dt_str] += t.minutes

        # flatten the data
        r = []
        for mrn in patient_report['patients']:
            p = patient_report['patients'][mrn]['info']
            for s in patient_report['patients'][mrn]['minute_stats']:
                r.append({
                    'first_name': p['first_name'],
                    'last_name': p['last_name'],
                    'mrn': mrn,
                    'stat_date': s,
                    'total_minutes': patient_report['patients'][mrn]['minute_stats'][s]
                })

        result = json.dumps(r, default=str)
        return json.loads(result)

    @staticmethod
    def get_registry_dashboard(registry_id, from_date, to_date):

        patients = RegistryService.get_patients(registry_id)

        payer_distribution = []
        scores = {}
        payers = {}
        treatment_performance = {
            'avg_weeks': 0,
            'median_weeks': 0,
            'max_weeks': 0
        }
        list_weeks = []
        for patient in patients:
            patient_registry = PatientRegistry(**patient)

            if patient_registry.payer not in payers:
                payers[patient_registry.payer] = 1
            else:
                payers[patient_registry.payer] += 1

            if len(patient_registry.treatment_logs) == 0: continue

            first_treatment_log = patient_registry.treatment_logs[0]
            last_treatment_log = patient_registry.treatment_logs[-1]

            first_date = datetime.utcfromtimestamp(first_treatment_log.date / 1000)
            last_date = datetime.utcfromtimestamp(last_treatment_log.date / 1000 )
            treatment_weeks = (last_date - first_date).days / 7

            treatment_performance['avg_weeks'] += treatment_weeks
            list_weeks.append(treatment_weeks)
            treatment_performance['max_weeks'] = max(treatment_performance['max_weeks'], treatment_weeks)

            for score in last_treatment_log.scores:
                if score.score_name not in scores:
                    scores[score.score_name] = {
                        'avg': score.score_value
                    }
                else:
                    scores[score.score_name]['avg'] = scores[score.score_name]['avg'] + score.score_value
            # calculate the average

        if len(patients) == 0: return None 

        treatment_performance['avg_weeks'] = treatment_performance['avg_weeks'] / len(patients)


        if len(list_weeks) > 0:
            list_weeks.sort()        
            treatment_performance['median_weeks'] = list_weeks[len(list_weeks) // 2]

        for score in scores:
            scores[score]['avg'] = scores[score]['avg'] / len(patients)
        
        for idx, payer in enumerate(payers):
            payer_distribution.append({
                'id': idx,
                'value': payers[payer],
                'label': payer
            })

        return {
            'treatment': treatment_performance,
            'screening': scores,
            'payer_distribution': payer_distribution,
            'patient_status_distribution': {
                'status': 'status_keys',
                'values': 'status_values'
            }
        }
