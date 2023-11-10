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
                utc_dt = datetime.utcfromtimestamp(t.date)
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
                    'phq9_first': p['phq9_first'],
                    'phq9_last': p['phq9_last'],
                    'phq9_last_date': p['phq9_last_date'],
                    'gad7_first': p['gad7_first'],
                    'gad7_last': p['gad7_last'],
                    'gad7_last_date': p['gad7_last_date'],
                    'mrn': mrn,
                    'stat_date': s,
                    'total_minutes': patient_report['patients'][mrn]['minute_stats'][s]
                })

        result = json.dumps(r, default=str)
        return json.loads(result)

    @staticmethod
    def get_registry_dashboard(registry_id, from_date, to_date):

        patients = RegistryService.get_patients(registry_id)
        successfully_loaded = []
        failed_patients = []
        for patient in patients:
            try:
                successfully_loaded.append(PatientRegistry(**patient))
            except Exception as e:
                failed_patients.append(patient['patient_mrn'])

        avg_phq9_initial = 0
        avg_gad7_initial = 0
        avg_phq9_last = 0
        avg_gad7_last = 0
        for patient in successfully_loaded:
            if patient.phq9_first and patient.gad7_first and patient.phq9_last and patient.gad7_last:
                avg_phq9_initial += patient.phq9_first
                avg_gad7_initial += patient.gad7_first
                avg_phq9_last += patient.phq9_last
                avg_gad7_last += patient.gad7_last

        avg_phq9_initial = avg_phq9_initial / len(successfully_loaded)
        avg_gad7_initial = avg_gad7_initial / len(successfully_loaded)
        avg_phq9_last = avg_phq9_last / len(successfully_loaded)
        avg_gad7_last = avg_gad7_last / len(successfully_loaded)

        payer_stats = {'no-payer': 0}
        for patient in successfully_loaded:
            if not patient.payer:
                payer_stats['no-payer'] += 1
            else:
                if patient.payer not in payer_stats:
                    payer_stats[patient.payer] = 0
                payer_stats[patient.payer] += 1

        patient_status_stats = {}
        for patient in successfully_loaded:
            if patient.status not in patient_status_stats:
                patient_status_stats[patient.status] = 0
            patient_status_stats[patient.status] += 1

        status_keys = [key.value for key in list(patient_status_stats.keys())]
        status_values = [patient_status_stats[status] for status in status_keys]

        return {
            'treatment': {
                'avg_weeks': -1,
                'median_weeks': -1,
                'max_weeks': -1
            },
            'screening': {
                'phq9': {
                    'initial': round(avg_phq9_initial),
                    'current': round(avg_phq9_last),
                    'weekly_delta': -1
                },
                'gad7': {
                    'initial': round(avg_gad7_initial),
                    'current': round(avg_gad7_last),
                    'weekly_delta': -1
                }
            },
            'payer_distribution': [{'id': idx, 'value': payer_stats[payer], 'label': payer} for idx, payer in
                                   enumerate(payer_stats)],
            'patient_status_distribution': {
                'status': status_keys,
                'values': status_values
            }
        }