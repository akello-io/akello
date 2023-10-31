
export class CaseloadVolumeCapacity {
    avg_weeks_first_and_last: number
    avg_count_patient_services: number
    override_monthly_capacity?: number

    pcpReferrals?: number
    patientCVR?: number
    graduationRate?: number

    populationComplexity?: number

    pct_patients_with_suicidality_risk?: number = 0
    pct_of_patients_with_prior_mental_health_ED_visit?: number = 0
    pct_of_patients_with_substance_abuse?: number = 0
    pct_of_patients_with_moderate?: number = 0


    constructor(
        avg_weeks_first_and_last: number,
        avg_count_patient_services: number,
        override_monthly_capacity?: number
    ) {
        this.avg_weeks_first_and_last = avg_weeks_first_and_last
        this.avg_count_patient_services = avg_count_patient_services

        if(override_monthly_capacity) {
            this.override_monthly_capacity = override_monthly_capacity
        }
    }

    case_load_capacity(total_service_units: number) {
        if(this.override_monthly_capacity) {
            return this.override_monthly_capacity
        }
        return Math.round(total_service_units / this.avg_count_patient_services * this.avg_weeks_first_and_last / 52)
    }

    annual_caseload_capacity(total_service_units: number) {
        return 52 * (this.case_load_capacity(total_service_units) / this.avg_weeks_first_and_last)
    }

    monthly_turnover(total_service_units: number) {
        return this.annual_caseload_capacity(total_service_units) / 12
    }

    patients_served_per_month(total_service_units: number) {
        return Math.round(this.monthly_turnover(total_service_units) + this.case_load_capacity(total_service_units))
    }

    projected_annual_monthly_case_potential(total_service_units: number) {
        return this.patients_served_per_month(total_service_units) * 12
    }

    copy() {
        let caseLoad = new CaseloadVolumeCapacity(
            this.avg_weeks_first_and_last,
            this.avg_count_patient_services,
            this.override_monthly_capacity
        )

        caseLoad.pcpReferrals = this.pcpReferrals
        caseLoad.patientCVR = this.patientCVR
        caseLoad.graduationRate = this.graduationRate
        caseLoad.populationComplexity = this.populationComplexity

        caseLoad.pct_patients_with_suicidality_risk = this.pct_patients_with_suicidality_risk
        caseLoad.pct_of_patients_with_prior_mental_health_ED_visit = this.pct_of_patients_with_prior_mental_health_ED_visit
        caseLoad.pct_of_patients_with_substance_abuse = this.pct_of_patients_with_substance_abuse
        caseLoad.pct_of_patients_with_moderate = this.pct_of_patients_with_moderate

        return caseLoad
    }

    set(obj: any) {

        this.avg_weeks_first_and_last = obj.avg_weeks_first_and_last
        this.avg_count_patient_services = obj.avg_count_patient_services
        this.override_monthly_capacity = obj.override_monthly_capacity

        this.pcpReferrals = obj.pcpReferrals
        this.patientCVR = obj.patientCVR
        this.graduationRate = obj.graduationRate
        this.populationComplexity = obj.populationComplexity

        this.pct_patients_with_suicidality_risk = obj.pct_patients_with_suicidality_risk
        this.pct_of_patients_with_prior_mental_health_ED_visit = obj.pct_of_patients_with_prior_mental_health_ED_visit
        this.pct_of_patients_with_substance_abuse = obj.pct_of_patients_with_substance_abuse
        this.pct_of_patients_with_moderate = obj.pct_of_patients_with_moderate
    }
}