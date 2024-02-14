export class BillingRateCollection {

    billing_rates: BillingRate[]
    state_code: string

    constructor(
        billing_rates: BillingRate[],
        state_code: string
    ) {
        this.billing_rates = billing_rates
        this.state_code = state_code
    }

    average_monthly_rate(patients_cocm_billable: number) {
        let total_reimbursement = 0
        this.billing_rates.forEach((bill_rate) => {
            total_reimbursement += bill_rate.total(patients_cocm_billable)
        })

        return total_reimbursement / patients_cocm_billable
    }

    setBillingRate(billing_rate: BillingRate) {
        let idx = this.billing_rates.findIndex((rate) => rate.name === billing_rate.name )
        this.billing_rates[idx] = billing_rate
    }

    getBillingRate(name: string) {
        let idx = this.billing_rates.findIndex((billing_rate) => billing_rate.name === name )
        return this.billing_rates[idx]
    }

    copy() {
        return new BillingRateCollection(
            this.billing_rates.map((rate) => rate.copy()),
            this.state_code
        )
    }

    set(obj: any) {
        this.state_code = obj.state_code
        this.billing_rates = []
        obj.billing_rates.forEach((rate: BillingRate) => {
            let newRate = new BillingRate(
                rate.name,
                rate.percent_of_eligible_patients,
                rate.avg_reimbursement_amount,
                rate.medicare_benchmark
            )
            this.billing_rates.push(newRate)
        })
    }
}


export class BillingRate {

    name: string
    percent_of_eligible_patients: number
    avg_reimbursement_amount: number
    medicare_benchmark: number

    constructor(name: string, percent_of_eligible_patients: number, avg_reimbursement_amount: number, medicare_benchmark: number) {
        this.name = name
        this.percent_of_eligible_patients = percent_of_eligible_patients
        this.avg_reimbursement_amount = avg_reimbursement_amount
        this.medicare_benchmark = medicare_benchmark
    }

    avg_number_of_patients(patients_cocm_billable: number) {
        return this.percent_of_eligible_patients * patients_cocm_billable
    }

    total(patients_cocm_billable: number) {
        return this.avg_number_of_patients(patients_cocm_billable) * this.avg_reimbursement_amount
    }

    copy() {
        return new BillingRate(this.name, this.percent_of_eligible_patients, this.avg_reimbursement_amount, this.medicare_benchmark)
    }

    set(obj: any) {
        this.name = obj.name
        this.percent_of_eligible_patients = obj.percent_of_eligible_patients
        this.avg_reimbursement_amount = obj.avg_reimbursement_amount
        this.medicare_benchmark = obj.medicare_benchmark
    }
}
