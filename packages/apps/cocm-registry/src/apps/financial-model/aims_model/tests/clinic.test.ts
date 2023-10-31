
import {
    StaffType
} from "../staff";
import {clinic} from "../init/init_models";

/*
it('STAFFING', () => {
    clinic.staffCollection.staff.forEach((staff) => {
        if(staff.type === StaffType.CareManager) {
            expect(staff.total_hours_per_week(clinic.staffCollection.hours_per_fte)).toBe(40)
        }
        if(staff.type === StaffType.Psychiatrist) {
            expect(staff.total_hours_per_week(clinic.staffCollection.hours_per_fte)).toBe(3)
        }
    })
});

it('WEEKLY TIME AND EFFORT ALLOCATION AND SERVICE UNIT GENERATION: BH PROVIDER or BH CARE MANAGER', () => {
    clinic.staffCollection.staff.forEach((staff) => {
        if(staff.type === StaffType.CareManager) {
            staff.services.direct_activities.forEach((activityCollection)=> {
                expect(activityCollection.getActivity('Warm Connection Visit 16 + min')?.service_units_generated).toBe(5)
                expect(activityCollection.getActivity('Initial Assessment Visit')?.service_units_generated).toBe(8.666666666666666)
                expect(activityCollection.getActivity('Follow Up Visit')?.service_units_generated).toBe(32)
                expect(activityCollection.getActivity('Group Treatment Visit')?.service_units_generated).toBe(6.0606060606060606)
            })
        }
    })
});

it('WEEKLY TIME AND EFFORT ALLOCATION AND SERVICE UNIT GENERATION: PSYCHIATRIC CONSULTANT', () => {
    clinic.staffCollection.staff.forEach((staff) => {
        if(staff.type === StaffType.Psychiatrist) {
            staff.services.direct_activities.forEach((activityCollection)=> {
                expect(activityCollection.getActivity('Direct Treatment: Assessment Visit')?.service_units_generated).toBe(0)
                expect(activityCollection.getActivity('Direct Treatment: Follow-up Visits')?.service_units_generated).toBe(0)
            })
        }
    })
});

it('ANNUALIZED REIMBURSABLE DIRECT CARE SERVICES', () => {
    clinic.staffCollection.staff.forEach((staff) => {
        if (staff.type === StaffType.CareManager) {
            staff.services.direct_activities.forEach((activityCollection) => {
                expect(activityCollection.direct_treatment_assessment(clinic.staffCollection.working_weeks_per_year)).toBe(407.3333333333333)
                expect(activityCollection.direct_treatment_ongoing(clinic.staffCollection.working_weeks_per_year)).toBe(1739)
                expect(activityCollection.group_treatment(clinic.staffCollection.working_weeks_per_year)).toBe(284.8484848484849)
            })
        }
    })
    expect(clinic.payerCollection.total_annualized_reimbursable_direct_care_services(clinic.staffCollection)).toBe(2431.1818181818185)
});

it('CASELOAD AND MONTHLY CASE VOLUME CAPACITY', () => {
    expect(Math.round(clinic.caseLoadCapacity.case_load_capacity(clinic.staffCollection.total_reimbursable_service_units.care_manager))).toBe(131)
    expect(Math.round(clinic.caseLoadCapacity.annual_caseload_capacity(clinic.staffCollection.total_reimbursable_service_units.care_manager))).toBe(486)
    expect(Math.round(clinic.caseLoadCapacity.monthly_turnover(clinic.staffCollection.total_reimbursable_service_units.care_manager))).toBe(41)
    expect(Math.round(clinic.caseLoadCapacity.patients_served_per_month(clinic.staffCollection.total_reimbursable_service_units.care_manager))).toBe(171)
    expect(Math.round(clinic.caseLoadCapacity.projected_annual_monthly_case_potential(clinic.staffCollection.total_reimbursable_service_units.care_manager))).toBe(2057)
});



it('PAYER MIX', () => {

    clinic.payerCollection.payers.forEach((payer) => {
        if(payer.name === 'medicare') expect(payer.adjusted_patients_eligible_cocm).toBe(.20)
        if(payer.name === 'medicaid') expect(payer.adjusted_patients_eligible_cocm).toBe(.0)
        if(payer.name === 'commercial OK for CoCM') expect(payer.adjusted_patients_eligible_cocm).toBe(.20)
        if(payer.name === 'commercial other') expect(payer.adjusted_patients_eligible_cocm).toBe(.0)
    })
});

it('REIMBURSEMENT: ANNUALIZED MONTHLY CoCM Billing', () => {
    let potential_cocm_caseload = clinic.caseLoadCapacity.projected_annual_monthly_case_potential(clinic.staffCollection.total_reimbursable_service_units.care_manager)
    clinic.payerCollection.payers.forEach((payer) => {
        if(payer.name === 'medicare') expect(payer.annualized_count_eligible_cocm(potential_cocm_caseload)).toBe(411.43076923076933)
        if(payer.name === 'commercial OK for CoCM') expect(payer.annualized_count_eligible_cocm(potential_cocm_caseload)).toBe(411.43076923076933)
    })

    clinic.caseLoadCapacity.case_load_capacity(clinic.staffCollection.total_reimbursable_service_units.care_manager)
    let cocm_reimbursement = clinic.payerCollection.total_annualized_reimbursement_monthly(
        clinic.caseLoadCapacity.projected_annual_monthly_case_potential(clinic.staffCollection.total_reimbursable_service_units.care_manager),
        152.9)

    expect(cocm_reimbursement).toBe( 125815.52923076927)
});

it('REIMBURSEMENT: ANNUALIZED BILLABLE INDIVIDUAL SERVICES', () => {
    //TODO: [% of Patients per Payer Eligible for Monthly Service Billing] - Need to verify how this column is computed

    expect(clinic.payerCollection.total_annualized_billable_individual_reimbursement(clinic.staffCollection)).toBe(170246.81818181818)
});

it('TOTAL REIMBURSEMENT', () => {

    let billable_individual_services_reimbursement = clinic.payerCollection.total_annualized_billable_individual_reimbursement(clinic.staffCollection)
    let cocm_reimbursement = clinic.payerCollection.total_annualized_reimbursement_monthly(
        clinic.caseLoadCapacity.projected_annual_monthly_case_potential(clinic.staffCollection.total_reimbursable_service_units.care_manager),
        152.9)

    expect(billable_individual_services_reimbursement + cocm_reimbursement).toBe( 296062.34741258743)

});

it('COST OF SERVICES', () => {
    expect(clinic.staffCollection.total_cost).toBe( 148203.125)
});

it('NET IMPACT', () => {
    let billable_individual_services_reimbursement = clinic.payerCollection.total_annualized_billable_individual_reimbursement(clinic.staffCollection)
    let cocm_reimbursement = clinic.payerCollection.total_annualized_reimbursement_monthly(
        clinic.caseLoadCapacity.projected_annual_monthly_case_potential(clinic.staffCollection.total_reimbursable_service_units.care_manager),
        152.9)

    let total_reimbursement = billable_individual_services_reimbursement + cocm_reimbursement
    let total_cost = clinic.staffCollection.total_cost

    expect(total_reimbursement - total_cost).toBe( 147859.22241258743)
});

it('MONTHLY BILLING RATE', () => {

    // Projected Number of Patients Served per Calendar Month
    let patients_per_month = clinic.caseLoadCapacity.patients_served_per_month(clinic.staffCollection.total_reimbursable_service_units.care_manager)

    // Percent (%) of Patients billable via BHI/CoCM codes
    let total_percent_patients_billable_cocm = 0
    clinic.payerCollection.payers.forEach((payer) => {
        total_percent_patients_billable_cocm += payer.adjusted_patients_eligible_cocm
    })

    // Total Number of Patients billable via CoCM codes
    let total_patients_cocm = patients_per_month * total_percent_patients_billable_cocm

    expect(clinic.billingRatesCollection.average_monthly_rate(total_patients_cocm)).toBe(152.89849999999998)
});


*/