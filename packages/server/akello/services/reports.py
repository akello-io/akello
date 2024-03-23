import datetime, json, logging
from akello.db.models import TreatmentLog, PatientRegistry
from akello.services import BaseService
from akello.services.registry import RegistryService
from datetime import datetime

logger = logging.getLogger('mangum')


class ReportsService(BaseService):
    """
    The ReportsService class is responsible for generating reports related to billing and registry dashboards
    for a healthcare provider. It leverages static methods to access patient data and compute relevant statistics
    for a specified period.
    """

    @staticmethod
    def calculate_99492(patient, year, month, minutes):

        try:

            initial_assessment = datetime.utcfromtimestamp(patient.initial_assessment / 1000)
            initial_assessment_year = initial_assessment.year
            initial_assessment_month = initial_assessment.month
        except Exception as e:
            logger.error('Error calculating 99492: %s' % e)
            return {
                '99492': False,
                '99494': 0
            }


        if initial_assessment_year != year or initial_assessment_month != month:
            return {
                '99492': False,
                '99494': 0
            }
                    
        return {
            '99492': minutes > 70,
            '99494': int((minutes - 70) / 30)
        }
    
    @staticmethod
    def calculate_99493(patient, year, month, minutes):
        try:
            initial_assessment = datetime.utcfromtimestamp(patient.initial_assessment / 1000)
            initial_assessment_year = initial_assessment.year
            initial_assessment_month = initial_assessment.month
        except Exception as e:
            logger.error('Error calculating 99493: %s' % e)
            return {
                '99493': False,
                '99494': 0
            }
        
        if initial_assessment_year == year and initial_assessment_month == month:            
            # return false if its for the month of the initial assessment
            return {
                '99493': False,
                '99494': 0
            }
                   
        return {
            '99493': minutes > 60,
            '99494': int((minutes - 60) / 30)
        }


    @staticmethod
    def get_billing_report(registry_id, from_date, to_date):    
        logger.info('running report for registry: %s from: %s to: %s' % (registry_id, from_date, to_date))

        report = {}
        patients = RegistryService.get_patients(registry_id)        

        # Generate the minute stats for each patient
        for patient in patients:
            patient = PatientRegistry(**patient)
            patient.treatment_logs = sorted(patient.treatment_logs, key=lambda x: x.date, reverse=True)
            patient_minute_stats = {}
            for treatment_log in patient.treatment_logs:
                month = datetime.utcfromtimestamp(treatment_log.date/1000).month
                year = datetime.utcfromtimestamp(treatment_log.date/1000).year
                if '%s-%s' % (month, year) not in patient_minute_stats:
                    patient_minute_stats['%s-%s' % (month, year)] = {
                        'minutes': 0, 
                        '99492': 0, 
                        '99493': 0, 
                        '99494': 0,
                        'cp_npi_visits': [],                        
                    }
                patient_minute_stats['%s-%s' % (month, year)]['minutes'] += treatment_log.minutes                
                if treatment_log.cp_npi and treatment_log.problems_list:                    
                    patient_minute_stats['%s-%s' % (month, year)]['cp_npi_visits'].append({
                        'cp_npi': treatment_log.cp_npi,
                        'problems': treatment_log.problems_list
                    })                
                
            if patient.patient_mrn not in report:
                report[patient.patient_mrn] = {}

            for month_year in patient_minute_stats:
                month, year = month_year.split('-')
                cpt99492 = ReportsService.calculate_99492(patient, int(year), int(month), patient_minute_stats[month_year]['minutes'])                
                cpt99493 = ReportsService.calculate_99493(patient, int(year), int(month), patient_minute_stats[month_year]['minutes'])
                
                if cpt99492['99492']:
                    patient_minute_stats[month_year]['99492'] = cpt99492['99492']
                    patient_minute_stats[month_year]['99494'] = cpt99492['99494']

                if cpt99493['99493']:
                    #import pdb;pdb.set_trace()
                    patient_minute_stats[month_year]['99493'] = cpt99493['99493']
                    patient_minute_stats[month_year]['99494'] = cpt99493['99494']

                


            report[patient.patient_mrn] = {
                'patient': patient.model_dump(),
                'minute_stats': patient_minute_stats,
            }            


        # flatten the data
        r = []
        for mrn in report:            
            patient = report[mrn]['patient']            
            for stat_date in report[mrn]['minute_stats']:                    
                r.append({      
                    'first_name': patient['first_name'],
                    'last_name': patient['last_name'],
                    'payer': patient['payer'],
                    'referring_provider_npi': patient['referring_provider_npi'],                                      
                    'mrn': mrn,
                    'stat_date': datetime.strptime(stat_date, '%m-%Y').timestamp() * 1000,
                    'initial_assessment': patient['initial_assessment'],
                    '99492': report[mrn]['minute_stats'][stat_date]['99492'],
                    '99493': report[mrn]['minute_stats'][stat_date]['99493'],
                    '99494': report[mrn]['minute_stats'][stat_date]['99494'],
                    'total_minutes': report[mrn]['minute_stats'][stat_date]['minutes'],
                    'cp_npi_visits': report[mrn]['minute_stats'][stat_date]['cp_npi_visits']
                })
        result = json.dumps(r, default=str)
        return json.loads(result)
        

    @staticmethod
    def get_registry_dashboard(registry_id, from_date, to_date):
        """
        Generates a dashboard report for a given registry within a specific date range, including information
        on payer distribution, patient statuses, and treatment performance metrics such as average, median,
        and maximum treatment weeks.

        Parameters:
        - registry_id: An identifier for the registry whose dashboard report is to be generated.
        - from_date: The starting timestamp (inclusive) for considering patient treatments.
        - to_date: The ending timestamp (inclusive) for considering patient treatments.

        Returns:
        - A dictionary containing structured information about the treatment performance, screening scores,
        payer distribution, and patient status distribution for the specified registry and date range.
        """

        patients = RegistryService.get_patients(registry_id)

        payer_distribution = []
        scores = {}
        payers = {}
        status_distribution = {}

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

            if patient_registry.status.value not in status_distribution:
                status_distribution[patient_registry.status.value] = 0

            status_distribution[patient_registry.status.value] += 1

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
                'status': list(status_distribution.keys()),
                'values': [value for key, value in status_distribution.items()]
            }
        }
