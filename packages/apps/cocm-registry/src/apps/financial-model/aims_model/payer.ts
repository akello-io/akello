import {StaffCollection, StaffType} from "./staff";

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
    obj[key];

export class PayerCollection {

    payers: Payer[]

    constructor(payers: Payer[]) {
        this.payers = payers
    }

    setPayer(payerInput: Payer) {
        let idx = this.payers.findIndex((payer) => payer.name === payerInput.name )
        this.payers[idx] = payerInput
    }

    getPayer(name: string) {
        let idx = this.payers.findIndex((payer) => payer.name === name )
        return this.payers[idx]
    }

    // ANNUALIZED REIMBURSABLE DIRECT CARE SERVICES
    total_annualized_reimbursable_direct_care_services(staffCollection: StaffCollection) {
        let total = 0

        staffCollection.staff.forEach((staff) => {
            staff.services.direct_activities.forEach((activityCollection) => {
                total += activityCollection.direct_treatment_assessment(staffCollection.working_weeks_per_year, staff.fte)
                total += activityCollection.direct_treatment_ongoing(staffCollection.working_weeks_per_year, staff.fte)
                total += activityCollection.group_treatment(staffCollection.working_weeks_per_year, staff.fte)
            })

        })
        return total
    }

    // REIMBURSEMENT TOTALS COCM MONTHLY
    total_annualized_reimbursement_monthly(monthly_cocm_caseload: number, monthly_rate: number) {
        let subtotal = 0.0
        this.payers.forEach((payer) => {
            if(payer.has_monthly_cocm_billing) {
                subtotal += payer.annualized_reimbursment_cocm(monthly_cocm_caseload, monthly_rate)
            }
        })
        return subtotal
    }

    // REIMBURSEMENT: ANNUALIZED BILLABLE INDIVIDUAL SERVICES
    weightedAvgServiceUnit(column: keyof Payer) {
        let sum_product = 0
        let sum_patients = 0
        this.payers.forEach((payer) => {
            if(payer.has_annualized_billable_individual_services) {
                let val =  getKeyValue<keyof Payer, Payer>(column)(payer) as number
                sum_product += payer.patients_per_payer * val
                sum_patients += payer.patients_per_payer
            }

        })
        return sum_product / sum_patients
    }
    billableIndividualServiceUnit(annualized_service_units: number) {
        let sum_patients = 0
        this.payers.forEach((payer) => {
            if(payer.has_annualized_billable_individual_services) {
                sum_patients += payer.patients_per_payer
            }
        })
        return sum_patients * annualized_service_units
    }
    subtotal(column: keyof Payer, annualized_service_units: number) {
        return this.weightedAvgServiceUnit(column) * this.billableIndividualServiceUnit(annualized_service_units)
    }
    total_annualized_billable_individual_reimbursement(staffCollection: StaffCollection) {
        let columns = {
            'payment_care_manager_direct_assessment': 0,
            'payment_care_manager_direct_ongoing': 0,
            'payment_care_manager_ongoing': 0,
            'payment_psychiatrist_direct_assessment': 0,
            'payment_psychiatrist_direct_ongoing': 0
        }

        staffCollection.staff.forEach((staff) => {
            if(staff.type === StaffType.CareManager) {
                staff.services.direct_activities.forEach((activityCollection) => {
                    columns['payment_care_manager_direct_assessment'] = activityCollection.direct_treatment_assessment(staffCollection.working_weeks_per_year, staff.fte)
                    columns['payment_care_manager_direct_ongoing'] = activityCollection.direct_treatment_ongoing(staffCollection.working_weeks_per_year, staff.fte)
                    columns['payment_care_manager_ongoing'] = activityCollection.group_treatment(staffCollection.working_weeks_per_year, staff.fte)
                })
            }
            if(staff.type === StaffType.Psychiatrist) {
                staff.services.direct_activities.forEach((activityCollection) => {
                    columns['payment_psychiatrist_direct_assessment'] = activityCollection.direct_treatment_assessment(staffCollection.working_weeks_per_year, staff.fte)
                    columns['payment_psychiatrist_direct_ongoing'] = activityCollection.direct_treatment_ongoing(staffCollection.working_weeks_per_year, staff.fte)
                })
            }
        })

        let total = 0
        for (let [key, value] of Object.entries(columns)) {
            total += this.subtotal(key as keyof Payer, value)
        }
        return total
    }

    get pct_total_cocm_eligible() {
        let total_cocm_expected = 0
        this.payers.forEach((payer) => {
            total_cocm_expected += payer.adjusted_patients_eligible_cocm
        })
        return total_cocm_expected
    }

    copy() {
        return new PayerCollection(
            this.payers.map((payer) => payer.copy())
        )
    }

    set(obj: any) {
        this.payers = []
        obj.payers.forEach((payer: Payer) => {
            this.payers.push(new Payer(
                payer.name,
                payer.patients_per_payer,
                payer.patients_per_payer_cocm_expected,
                payer.payment_care_manager_direct_assessment,
                payer.payment_care_manager_direct_ongoing,
                payer.payment_care_manager_ongoing,
                payer.payment_psychiatrist_direct_assessment,
                payer.payment_psychiatrist_direct_ongoing,
                payer.has_monthly_cocm_billing,
                payer.has_annualized_billable_individual_services
            ))
        })
    }
}


interface IPayer {
    name: string
    patients_per_payer: number
    patients_per_payer_cocm_expected: number
    payment_care_manager_direct_assessment: number
    payment_care_manager_direct_ongoing: number
    payment_care_manager_ongoing: number
    payment_psychiatrist_direct_assessment: number
    payment_psychiatrist_direct_ongoing: number
    has_annualized_billable_individual_services: boolean
    has_monthly_cocm_billing: boolean
    [key: string]: any;
}

export class Payer implements IPayer {
    name: string
    patients_per_payer: number
    patients_per_payer_cocm_expected: number
    payment_care_manager_direct_assessment: number
    payment_care_manager_direct_ongoing: number
    payment_care_manager_ongoing: number
    payment_psychiatrist_direct_assessment: number
    payment_psychiatrist_direct_ongoing: number
    has_monthly_cocm_billing: boolean
    has_annualized_billable_individual_services: boolean

    constructor(
        name: string,
        patients_per_payer: number,
        patients_per_payer_cocm_expected: number,
        payment_care_manager_direct_assessment: number,
        payment_care_manager_direct_ongoing: number,
        payment_care_manager_ongoing: number,
        payment_psychiatrist_direct_assessment: number,
        payment_psychiatrist_direct_ongoing: number,
        has_monthly_cocm_billing: boolean,
        has_annualized_billable_individual_services: boolean
    ) {
        this.name = name
        this.patients_per_payer = patients_per_payer
        this.patients_per_payer_cocm_expected = patients_per_payer_cocm_expected
        this.payment_care_manager_direct_assessment = payment_care_manager_direct_assessment
        this.payment_care_manager_direct_ongoing = payment_care_manager_direct_ongoing
        this.payment_care_manager_ongoing = payment_care_manager_ongoing
        this.payment_psychiatrist_direct_assessment = payment_psychiatrist_direct_assessment
        this.payment_psychiatrist_direct_ongoing = payment_psychiatrist_direct_ongoing
        this.has_monthly_cocm_billing = has_monthly_cocm_billing
        this.has_annualized_billable_individual_services = has_annualized_billable_individual_services
    }

    get adjusted_patients_eligible_cocm() {
        return this.patients_per_payer * this.patients_per_payer_cocm_expected
    }

    annualized_count_eligible_cocm(potential_cocm_caseload: number) {
        return this.adjusted_patients_eligible_cocm * potential_cocm_caseload
    }

    annualized_reimbursment_cocm(potential_cocm_caseload: number, avg_monthly_reimbursement: number) {
        return this.annualized_count_eligible_cocm(potential_cocm_caseload) *  avg_monthly_reimbursement
    }

    copy() {
        return new Payer(
            this.name,
            this.patients_per_payer,
            this.patients_per_payer_cocm_expected,
            this.payment_care_manager_direct_assessment,
            this.payment_care_manager_direct_ongoing,
            this.payment_care_manager_ongoing,
            this.payment_psychiatrist_direct_assessment,
            this.payment_psychiatrist_direct_ongoing,
            this.has_monthly_cocm_billing,
            this.has_annualized_billable_individual_services
        )
    }

    set(obj: any) {
        this.name = obj.name
        this.patients_per_payer = obj.patients_per_payer
        this.patients_per_payer_cocm_expected = obj.patients_per_payer_cocm_expected
        this.payment_care_manager_direct_assessment = obj.payment_care_manager_direct_assessment
        this.payment_care_manager_direct_ongoing = obj.payment_care_manager_direct_ongoing
        this.payment_care_manager_ongoing = obj.payment_care_manager_ongoing
        this.payment_psychiatrist_direct_assessment = obj.payment_psychiatrist_direct_assessment
        this.payment_psychiatrist_direct_ongoing = obj.payment_psychiatrist_direct_ongoing
        this.has_monthly_cocm_billing = obj.has_monthly_cocm_billing
        this.has_annualized_billable_individual_services = obj.has_annualized_billable_individual_services
    }
}