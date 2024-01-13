from pydantic import BaseModel
import datetime


class FinancialModel(BaseModel):
    schema_version: str
    user_id: str
    name: str
    description: str
    address_state: str

    full_time_pcps: int
    pct_pcps_participation: float
    monthly_pcp_referrals: int
    pct_patients_accepting_cocm: float
    pct_patients_graduating: float

    payer_distribution_medicare: float
    payer_distribution_medicare_cocm_expected: float
    payer_distribution_medicaid: float
    payer_distribution_medicaid_cocm_expected: float
    payer_distribution_commercial_cocm: float
    payer_distribution_commercial_cocm_cocm_expected: float
    payer_distribution_commercial_no_cocm: float

    caseload_complexity_pct_patients_suicidality: float = 0
    caseload_complexity_pct_patients_prior_ed: float = 0
    caseload_complexity_pct_patients_substance_abuse: float = 0
    caseload_complexity_pct_patients_above_moderate: float = 0

    care_manager_salary: float
    care_manager_benefits: float
    psychiatrist_salary: float
    psychiatrist_benefits: float

    service_unit_direct_bhm__warm_connection_over_16: float
    service_unit_direct_bhm__initial_assessment_visit: float
    service_unit_direct_bhm__follow_up_visit: float
    service_unit_direct_bhm__group_treatment: float
    service_unit_other_bhm__warm_connection_under1_16: float
    service_unit_other_bhm__outreach_attempts: float
    service_unit_other_bhm__telephone_visit: float
    service_unit_other_bhm__caseload_patient_and_psych_consult: float
    service_unit_other_bhm__team_communication: float
    service_unit_other_bhm__registry_management: float
    service_unit_admin_bhm__charting: float
    service_unit_admin_bhm__other: float

    service_unit_direct_cp_treatment_visit: float
    service_unit_direct_cp_follow_up: float
    service_unit_other_cp_registry_review: float
    service_unit_other_cp_direct_pcp_communication: float
    service_unit_other_cp_caseload_review: float
    service_unit_other_cp_charting: float
    service_unit_other_cp_other: float

    billing_rate_not_seen__patients: float
    billing_rate_not_seen__avg_amount: float
    billing_rate_G2214__patients: float
    billing_rate_G2214__avg_amount: float
    billing_rate_99492__patients: float
    billing_rate_99492__avg_amount: float
    billing_rate_99492_99494__patients: float
    billing_rate_99492_99494__avg_amount: float
    billing_rate_99492_99494x2__patients: float
    billing_rate_99492_99494x2__avg_amount: float
    billing_rate_99493__patients: float
    billing_rate_99493__avg_amount: float
    billing_rate_99493_99494__patients: float
    billing_rate_99493_99494__avg_amount: float
    billing_rate_99493_99494x2__patients: float
    billing_rate_99493_99494x2__avg_amount: float

    modified_date: float
    created_date: float

    @property
    def partition_key(self) -> str:
        return 'financial_model:' + self.user_id

    @property
    def sort_key(self) -> str:
        return self.name

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Foo",
                }
            ]
        }
    }

"""
def load_client_model(model, user_id):
    modified = datetime.datetime.utcnow().timestamp()
    created = datetime.datetime.utcnow().timestamp()
    payers = {}
    staff = {}

    for payer in model['payerCollection']['payers']:
        payers[payer['name']] = payer

    for staff_member in model['staffCollection']['staff']:
        staff[staff_member['type']] = staff_member

    bhm_service_column_mapping = {
        'Direct Care Services Reimbursable via CoCM or Counseling CPT codes': {
            'Warm Connection Visit 16 + min': 'service_unit_direct_bhm__warm_connection_over_16',
            'Initial Assessment Visit': 'service_unit_direct_bhm__initial_assessment_visit',
            'Follow Up Visit': 'service_unit_direct_bhm__follow_up_visit',
            'Group Treatment Visit': 'service_unit_direct_bhm__group_treatment',
        },
        'Other BH Care Manager Services (reimbursable under CoCM codes)': {
            'Warm Connection visit under 16 minutes': 'service_unit_other_bhm__warm_connection_under1_16',
            'Outreach attempts (phone, letter, etc)': 'service_unit_other_bhm__outreach_attempts',
            'Telephone Visit': 'service_unit_other_bhm__telephone_visit',
            'Caseload and Patient Review with Psych Consultant': 'service_unit_other_bhm__caseload_patient_and_psych_consult',
            'Team Communication': 'service_unit_other_bhm__team_communication',
            'Registry Management': 'service_unit_other_bhm__registry_management',
        },
        'Administrative Tasks': {
            'Charting': 'service_unit_admin_bhm__charting',
            'Other (Clinical Supervision, Staff Meetings, Training, etc.)': 'service_unit_admin_bhm__other',
        }
    }

    cp_service_column_mapping = {
        'Direct Care Services Reimbursable via Psych CPT codes': {
            'Direct Treatment: Assessment Visit': 'service_unit_direct_cp_treatment_visit',
            'Direct Treatment: Follow-up Visits': 'service_unit_direct_cp_follow_up'
        },
        'Indirect Care and Administrative Tasks': {
            'Registry Review': 'service_unit_other_cp_registry_review',
            'Direct PCP Communication': 'service_unit_other_cp_direct_pcp_communication',
            'Caseload and Patient Review with BH Care Manager': 'service_unit_other_cp_caseload_review',
            'Charting': 'service_unit_other_cp_charting',
            'Other (Research, Staff Meetings, Training, etc.)': 'service_unit_other_cp_other'
        }
    }

    billing_rate_column_mapping = {
        'Not Seen or Threshold Not Met': {
            '%patients': 'billing_rate_not_seen__patients',
            'avg_amount': 'billing_rate_not_seen__avg_amount'
        },
        'NEW! 30 min ANY month (G2214)': {
            '%patients': 'billing_rate_G2214__patients',
            'avg_amount': 'billing_rate_G2214__avg_amount'
        },
        '70 Initial Month Minutes (99492 )': {
            '%patients': 'billing_rate_99492__patients',
            'avg_amount': 'billing_rate_99492__avg_amount'
        },
        '100 Initial Minutes (99492 + 99494)': {
            '%patients': 'billing_rate_99492_99494__patients',
            'avg_amount': 'billing_rate_99492_99494__avg_amount'
        },
        '130 Initial Minutes (99492 + 99494 x 2)': {
            '%patients': 'billing_rate_99492_99494x2__patients',
            'avg_amount': 'billing_rate_99492_99494x2__avg_amount'
        },
        '60 Subsequent Month Minutes (99493 )': {
            '%patients': 'billing_rate_99493__patients',
            'avg_amount': 'billing_rate_99493__avg_amount'
        },
        '90 Subsequent Minutes (99493 + 99494)': {
            '%patients': 'billing_rate_99493_99494__patients',
            'avg_amount': 'billing_rate_99493_99494__avg_amount'
        },
        '120 Subsequent Minutes (99493 + 99494 x 2)': {
            '%patients': 'billing_rate_99493_99494x2__patients',
            'avg_amount': 'billing_rate_99493_99494x2__avg_amount'
        },
    }

    bhm_service_column_value_mapping = {}
    cp_service_column_value_mapping = {}
    billing_rate_column_value_mapping = {}

    for service_group in staff['CareManager']['services']:
        for activity_group in staff['CareManager']['services'][service_group]:
            for activity in activity_group['activities']:
                db_col = bhm_service_column_mapping[activity_group['name']][activity['name']]
                print(activity)
                val = activity['hrs']
                bhm_service_column_value_mapping[db_col] = val

    for service_group in staff['Psychiatrist']['services']:
        for activity_group in staff['Psychiatrist']['services'][service_group]:
            for activity in activity_group['activities']:
                db_col = cp_service_column_mapping[activity_group['name']][activity['name']]
                print(activity)
                val = activity['hrs']
                cp_service_column_value_mapping[db_col] = val

    for billingRate in model['billingRatesCollection']['billing_rates']:
        db_col_pct_patients = billing_rate_column_mapping[billingRate['name']]['%patients']
        db_col_avg_amount = billing_rate_column_mapping[billingRate['name']]['avg_amount']
        billing_rate_column_value_mapping[db_col_pct_patients] = billingRate['percent_of_eligible_patients']
        billing_rate_column_value_mapping[db_col_avg_amount] = billingRate['avg_reimbursement_amount']

    financial_model = FinancialModel(
        schema_version=model['schema_version'] if 'schema_version' in model and model['schema_version'] else 'V1',
        user_id=user_id,
        name='Financial Model',
        description='',
        address_state='',
        # name=model['name'],
        # description=model['description'],
        # address_state=model['address_state'],

        full_time_pcps=model['staffCollection']['full_time_pcps'],
        pct_pcps_participation=model['staffCollection']['full_time_pcps_cocm_percent'],
        monthly_pcp_referrals=model['caseLoadCapacity']['pcpReferrals'],
        pct_patients_accepting_cocm=model['caseLoadCapacity']['patientCVR'],
        pct_patients_graduating=model['caseLoadCapacity']['graduationRate'],

        payer_distribution_medicare=payers['Medicare']['patients_per_payer'],
        payer_distribution_medicare_cocm_expected=payers['Medicare']['patients_per_payer_cocm_expected'],
        payer_distribution_medicaid=payers['Medicaid']['patients_per_payer'],
        payer_distribution_medicaid_cocm_expected=payers['Medicaid']['patients_per_payer_cocm_expected'],
        payer_distribution_commercial_cocm=payers['Commercial OK for CoCM']['patients_per_payer'],
        payer_distribution_commercial_cocm_cocm_expected=payers['Commercial OK for CoCM'][
            'patients_per_payer_cocm_expected'],
        payer_distribution_commercial_no_cocm=payers['Commercial other']['patients_per_payer'],

        caseload_complexity_pct_patients_suicidality=model['caseLoadCapacity']['pct_patients_with_suicidality_risk'],
        caseload_complexity_pct_patients_prior_ed=model['caseLoadCapacity'][
            'pct_of_patients_with_prior_mental_health_ED_visit'],
        caseload_complexity_pct_patients_substance_abuse=model['caseLoadCapacity'][
            'pct_of_patients_with_substance_abuse'],
        caseload_complexity_pct_patients_above_moderate=model['caseLoadCapacity']['pct_of_patients_with_moderate'],

        care_manager_salary=staff['CareManager']['annual_salary'],
        care_manager_benefits=staff['CareManager']['fringe_benefits_percent_of_salary'],

        psychiatrist_salary=staff['Psychiatrist']['annual_salary'],
        psychiatrist_benefits=staff['Psychiatrist']['fringe_benefits_percent_of_salary'],

        service_unit_direct_bhm__warm_connection_over_16=bhm_service_column_value_mapping[
            'service_unit_direct_bhm__warm_connection_over_16'],
        service_unit_direct_bhm__initial_assessment_visit=bhm_service_column_value_mapping[
            'service_unit_direct_bhm__initial_assessment_visit'],
        service_unit_direct_bhm__follow_up_visit=bhm_service_column_value_mapping[
            'service_unit_direct_bhm__follow_up_visit'],
        service_unit_direct_bhm__group_treatment=bhm_service_column_value_mapping[
            'service_unit_direct_bhm__group_treatment'],
        service_unit_other_bhm__warm_connection_under1_16=bhm_service_column_value_mapping[
            'service_unit_other_bhm__warm_connection_under1_16'],
        service_unit_other_bhm__outreach_attempts=bhm_service_column_value_mapping[
            'service_unit_other_bhm__outreach_attempts'],
        service_unit_other_bhm__telephone_visit=bhm_service_column_value_mapping[
            'service_unit_other_bhm__telephone_visit'],
        service_unit_other_bhm__caseload_patient_and_psych_consult=bhm_service_column_value_mapping[
            'service_unit_other_bhm__caseload_patient_and_psych_consult'],
        service_unit_other_bhm__team_communication=bhm_service_column_value_mapping[
            'service_unit_other_bhm__team_communication'],
        service_unit_other_bhm__registry_management=bhm_service_column_value_mapping[
            'service_unit_other_bhm__registry_management'],
        service_unit_admin_bhm__charting=bhm_service_column_value_mapping['service_unit_admin_bhm__charting'],
        service_unit_admin_bhm__other=bhm_service_column_value_mapping['service_unit_admin_bhm__other'],

        service_unit_direct_cp_treatment_visit=cp_service_column_value_mapping[
            'service_unit_direct_cp_treatment_visit'],
        service_unit_direct_cp_follow_up=cp_service_column_value_mapping['service_unit_direct_cp_follow_up'],
        service_unit_other_cp_registry_review=cp_service_column_value_mapping['service_unit_other_cp_registry_review'],
        service_unit_other_cp_direct_pcp_communication=cp_service_column_value_mapping[
            'service_unit_other_cp_direct_pcp_communication'],
        service_unit_other_cp_caseload_review=cp_service_column_value_mapping['service_unit_other_cp_caseload_review'],
        service_unit_other_cp_charting=cp_service_column_value_mapping['service_unit_other_cp_charting'],
        service_unit_other_cp_other=cp_service_column_value_mapping['service_unit_other_cp_other'],

        billing_rate_not_seen__patients=billing_rate_column_value_mapping['billing_rate_not_seen__patients'],
        billing_rate_not_seen__avg_amount=billing_rate_column_value_mapping['billing_rate_not_seen__avg_amount'],
        billing_rate_G2214__patients=billing_rate_column_value_mapping['billing_rate_G2214__patients'],
        billing_rate_G2214__avg_amount=billing_rate_column_value_mapping['billing_rate_G2214__avg_amount'],
        billing_rate_99492__patients=billing_rate_column_value_mapping['billing_rate_99492__patients'],
        billing_rate_99492__avg_amount=billing_rate_column_value_mapping['billing_rate_99492__avg_amount'],
        billing_rate_99492_99494__patients=billing_rate_column_value_mapping['billing_rate_99492_99494__patients'],
        billing_rate_99492_99494__avg_amount=billing_rate_column_value_mapping['billing_rate_99492_99494__avg_amount'],
        billing_rate_99492_99494x2__patients=billing_rate_column_value_mapping['billing_rate_99492_99494x2__patients'],
        billing_rate_99492_99494x2__avg_amount=billing_rate_column_value_mapping[
            'billing_rate_99492_99494x2__avg_amount'],
        billing_rate_99493__patients=billing_rate_column_value_mapping['billing_rate_99493__patients'],
        billing_rate_99493__avg_amount=billing_rate_column_value_mapping['billing_rate_99493__avg_amount'],
        billing_rate_99493_99494__patients=billing_rate_column_value_mapping['billing_rate_99493_99494__patients'],
        billing_rate_99493_99494__avg_amount=billing_rate_column_value_mapping['billing_rate_99493_99494__avg_amount'],
        billing_rate_99493_99494x2__patients=billing_rate_column_value_mapping['billing_rate_99493_99494x2__patients'],
        billing_rate_99493_99494x2__avg_amount=billing_rate_column_value_mapping[
            'billing_rate_99493_99494x2__avg_amount'],

        modified_date=modified,
        created_date=created  # TODO: WE SHOULD NOT BE SETTING CREATED DATE
    )
    return financial_model
"""


"""
def load_db_model(model, user_id):
    # TODO: Refactor this into a utility for all json objects being stored
    modified = datetime.datetime.utcnow().timestamp()
    created = datetime.datetime.utcnow().timestamp()

    payers = {}
    for payer in model['payerCollection']['payers']:
        payers[payer['name']] = payer

    staff = {}
    for staff_member in model['staffCollection']['staff']:
        staff[staff_member['type']] = staff_member

    financial_model = FinancialModel(
        schema_version='V1',
        user_id=user_id,
        name='Financial Model',
        description='',
        address_state='',
        # name=model['name'],
        # description=model['description'],
        # address_state=model['address_state'],

        full_time_pcps=model['staffCollection']['full_time_pcps'],
        pct_pcps_participation=model['staffCollection']['full_time_pcps_cocm_percent'],
        monthly_pcp_referrals=model['caseLoadCapacity']['pcpReferrals'],
        pct_patients_accepting_cocm=model['caseLoadCapacity']['patientCVR'],
        pct_patients_graduating=model['caseLoadCapacity']['graduationRate'],

        payer_distribution_medicare=payers['Medicare']['patients_per_payer'],
        payer_distribution_medicare_cocm_expected=payers['Medicare']['patients_per_payer_cocm_expected'],
        payer_distribution_medicaid=payers['Medicaid']['patients_per_payer'],
        payer_distribution_medicaid_cocm_expected=payers['Medicaid']['patients_per_payer_cocm_expected'],
        payer_distribution_commercial_cocm=payers['Commercial OK for CoCM']['patients_per_payer'],
        payer_distribution_commercial_cocm_cocm_expected=payers['Commercial OK for CoCM'][
            'patients_per_payer_cocm_expected'],
        payer_distribution_commercial_no_cocm=payers['Commercial other']['patients_per_payer'],

        caseload_complexity_pct_patients_suicidality=model['caseLoadCapacity']['pct_patients_with_suicidality_risk'],
        caseload_complexity_pct_patients_prior_ed=model['caseLoadCapacity'][
            'pct_of_patients_with_prior_mental_health_ED_visit'],
        caseload_complexity_pct_patients_substance_abuse=model['caseLoadCapacity'][
            'pct_of_patients_with_substance_abuse'],
        caseload_complexity_pct_patients_above_moderate=model['caseLoadCapacity']['pct_of_patients_with_moderate'],

        care_manager_salary=staff['CareManager']['annual_salary'],
        care_manager_benefits=staff['CareManager']['fringe_benefits_percent_of_salary'],

        psychiatrist_salary=staff['Psychiatrist']['annual_salary'],
        psychiatrist_benefits=staff['Psychiatrist']['fringe_benefits_percent_of_salary'],

        service_unit_direct_bhm__warm_connection_over_16=1.5,
        service_unit_direct_bhm__initial_assessment_visit=6.5,
        service_unit_direct_bhm__follow_up_visit=16,
        service_unit_direct_bhm__group_treatment=2,
        service_unit_other_bhm__warm_connection_under1_16=1,
        service_unit_other_bhm__outreach_attempts=1,
        service_unit_other_bhm__telephone_visit=2,
        service_unit_other_bhm__caseload_patient_and_psych_consult=1,
        service_unit_other_bhm__team_communication=1,
        service_unit_other_bhm__registry_management=1,
        service_unit_admin_bhm__charting=5,
        service_unit_admin_bhm__other=2,

        service_unit_other_cp_registry_review=0.5,
        service_unit_other_cp_direct_pcp_communication=0.5,
        service_unit_other_cp_caseload_review=1,
        service_unit_other_cp_charting=0.5,
        service_unit_other_cp_other=0.5,
        service_unit_direct_cp_treatment_visit=0,
        service_unit_direct_cp_follow_up=0,

        billing_rate_not_seen__patients=0.05,
        billing_rate_not_seen__avg_amount=0,
        billing_rate_G2214__patients=0.10,
        billing_rate_G2214__avg_amount=57.19,
        billing_rate_99492__patients=0.15,
        billing_rate_99492__avg_amount=147.12,
        billing_rate_99492_99494__patients=0.05,
        billing_rate_99492_99494__avg_amount=203.65,
        billing_rate_99492_99494x2__patients=0.05,
        billing_rate_99492_99494x2__avg_amount=260.18,
        billing_rate_99493__patients=.40,
        billing_rate_99493__avg_amount=139.18,
        billing_rate_99493_99494__patients=.15,
        billing_rate_99493_99494__avg_amount=195.71,
        billing_rate_99493_99494x2__patients=0.05,
        billing_rate_99493_99494x2__avg_amount=252.24,

        modified_date=modified,
        created_date=created
    )

    return financial_model
"""