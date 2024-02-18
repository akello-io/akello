import {StaffCollection, StaffType} from "./staff";
import {PayerCollection} from "./payer";
import {BillingRateCollection} from "./billing_rates";
import {CaseloadVolumeCapacity} from "./caseload_capacity";
import moment from "moment";
import FinancialModelDBRecordTypeV1 from "../../data/schemas/FinancialModel";


export class Clinic {
    staffCollection: StaffCollection
    payerCollection: PayerCollection
    billingRatesCollection: BillingRateCollection
    caseLoadCapacity: CaseloadVolumeCapacity

    created_at: number

    name?: string
    description?: string
    address_street?: string
    address_city?: string
    address_state?: string
    address_zipcode?: string

    constructor(staffCollection: StaffCollection, payerCollection: PayerCollection, billingRatesCollection: BillingRateCollection, caseLoadCapacity: CaseloadVolumeCapacity) {
        this.staffCollection = staffCollection
        this.payerCollection = payerCollection
        this.billingRatesCollection = billingRatesCollection
        this.caseLoadCapacity = caseLoadCapacity
        this.created_at = moment.utc().valueOf()
    }


    // management functions for CoCM Participation

    setFullTimePCP(full_time_pcps: number) {
        this.staffCollection.full_time_pcps = full_time_pcps
        this.refreshInputs()
    }

    setPCPParticipation(pcp_participation: number) {
        this.staffCollection.full_time_pcps_cocm_percent = pcp_participation
        this.refreshInputs()
    }

    setPCPReferrals(pcp_referrals: number) {
        this.caseLoadCapacity.pcpReferrals = pcp_referrals
        this.refreshInputs()
    }

    setPatientCVR(patient_cvr: number) {
        this.caseLoadCapacity.patientCVR = patient_cvr
        this.refreshInputs()
    }

    setPatientGraduation(graduation: number) {
        this.caseLoadCapacity.graduationRate = graduation
        this.refreshInputs()
    }

    refreshInputs() {
        let referrals = this.staffCollection.full_time_pcps! * this.staffCollection.full_time_pcps_cocm_percent! * this.caseLoadCapacity.pcpReferrals! * this.caseLoadCapacity.patientCVR!
        referrals = referrals - referrals * this.caseLoadCapacity.graduationRate!
        this.caseLoadCapacity.override_monthly_capacity = referrals

        let careManager = this.staffCollection.getStaffMember(StaffType.CareManager)!
        let psychiatrist = this.staffCollection.getStaffMember(StaffType.Psychiatrist)!

        careManager.fte = this.staffCollection.getCareManagerFTECnt(this.caseLoadCapacity)
        psychiatrist.fte = this.staffCollection.getPsychiatristFTECnt()

        this.staffCollection.setStaffMember(careManager)
        this.staffCollection.setStaffMember(psychiatrist)
    }

    copy() {
        let cliniccopy = new Clinic(
            this.staffCollection.copy(),
            this.payerCollection.copy(),
            this.billingRatesCollection.copy(),
            this.caseLoadCapacity.copy(),
        )
        cliniccopy.created_at = this.created_at
        cliniccopy.name = this.name
        cliniccopy.description = this.description
        cliniccopy.address_street = this.address_street
        cliniccopy.address_city = this.address_city
        cliniccopy.address_state = this.address_state
        cliniccopy.address_zipcode = this.address_zipcode

        return cliniccopy
    }

    set(obj: any) {
        this.staffCollection.set(obj.staffCollection)
        this.payerCollection.set(obj.payerCollection)
        this.billingRatesCollection.set(obj.billingRatesCollection)
        this.caseLoadCapacity.set(obj.caseLoadCapacity)
        this.created_at = obj.created_at
        this.name = obj.name

        this.description = obj.description
        this.address_street = obj.address_street
        this.address_city = obj.address_city
        this.address_state = obj.address_state
        this.address_zipcode = obj.address_zipcode
    }

    setInputs(inputs: FinancialModelDBRecordTypeV1) {
        this.name = inputs.name
        this.description = inputs.description
        this.address_state = inputs.address_state

        this.staffCollection.full_time_pcps = inputs.full_time_pcps
        this.staffCollection.full_time_pcps_cocm_percent = inputs.pct_patients_accepting_cocm

        this.caseLoadCapacity.pcpReferrals = inputs.monthly_pcp_referrals
        this.caseLoadCapacity.patientCVR = inputs.pct_patients_accepting_cocm
        this.caseLoadCapacity.graduationRate = inputs.pct_patients_graduating

        this.caseLoadCapacity.pct_patients_with_suicidality_risk = inputs.caseload_complexity_pct_patients_suicidality
        this.caseLoadCapacity.pct_of_patients_with_prior_mental_health_ED_visit = inputs.caseload_complexity_pct_patients_prior_ed
        this.caseLoadCapacity.pct_of_patients_with_substance_abuse = inputs.caseload_complexity_pct_patients_substance_abuse
        this.caseLoadCapacity.pct_of_patients_with_moderate = inputs.caseload_complexity_pct_patients_above_moderate

        let medicare = this.payerCollection.getPayer("Medicare")
        medicare.patients_per_payer = inputs.payer_distribution_medicare
        medicare.patients_per_payer_cocm_expected = inputs.payer_distribution_medicare_cocm_expected
        this.payerCollection.setPayer(medicare)

        let medicaid = this.payerCollection.getPayer('Medicaid')
        medicaid.patients_per_payer = inputs.payer_distribution_medicaid
        medicaid.patients_per_payer_cocm_expected = inputs.payer_distribution_medicaid_cocm_expected
        this.payerCollection.setPayer(medicaid)

        let commerical_cocm_ok = this.payerCollection.getPayer('Commercial OK for CoCM')
        commerical_cocm_ok.patients_per_payer = inputs.payer_distribution_commercial_cocm
        commerical_cocm_ok.patients_per_payer_cocm_expected = inputs.payer_distribution_commercial_cocm_cocm_expected
        this.payerCollection.setPayer(commerical_cocm_ok)

        let commerical_other = this.payerCollection.getPayer('Commercial other')
        commerical_other.patients_per_payer = inputs.payer_distribution_commercial_no_cocm
        commerical_other.patients_per_payer_cocm_expected = 0
        this.payerCollection.setPayer(commerical_other)

        let bhm = this.staffCollection.getStaffMember(StaffType.CareManager)!
        let cp = this.staffCollection.getStaffMember(StaffType.Psychiatrist)!
        bhm.annual_salary = inputs.care_manager_salary
        bhm.fringe_benefits_percent_of_salary = inputs.care_manager_benefits
        cp.annual_salary = inputs.psychiatrist_salary
        cp.fringe_benefits_percent_of_salary = inputs.psychiatrist_benefits

        let direct_warm = bhm.services.direct_activities[0].getActivity('Warm Connection Visit 16 + min')!
        let initial_visit = bhm.services.direct_activities[0].getActivity('Initial Assessment Visit')
        let follow_up_visit = bhm.services.direct_activities[0].getActivity('Follow Up Visit')
        let group_treatment_visit = bhm.services.direct_activities[0].getActivity('Group Treatment Visit')
        direct_warm!.hrs = inputs.service_unit_direct_bhm__warm_connection_over_16
        initial_visit!.hrs = inputs.service_unit_direct_bhm__initial_assessment_visit
        follow_up_visit!.hrs = inputs.service_unit_direct_bhm__follow_up_visit
        group_treatment_visit!.hrs = inputs.service_unit_direct_bhm__group_treatment


        let warm_under = bhm.services.other_activities[0].getActivity('Warm Connection visit under 16 minutes')!
        let outreach = bhm.services.other_activities[0].getActivity('Outreach attempts (phone, letter, etc)')!
        let telephone = bhm.services.other_activities[0].getActivity('Telephone Visit')!
        let caseload_review = bhm.services.other_activities[0].getActivity('Caseload and Patient Review with Psych Consultant')!
        let team_communication = bhm.services.other_activities[0].getActivity('Team Communication')!
        let registry_management = bhm.services.other_activities[0].getActivity('Registry Management')!
        warm_under.hrs = inputs.service_unit_other_bhm__warm_connection_under1_16
        outreach.hrs = inputs.service_unit_other_bhm__outreach_attempts
        telephone.hrs = inputs.service_unit_other_bhm__telephone_visit
        caseload_review.hrs = inputs.service_unit_other_bhm__caseload_patient_and_psych_consult
        team_communication.hrs = inputs.service_unit_other_bhm__team_communication
        registry_management.hrs = inputs.service_unit_other_bhm__registry_management

        let charting = bhm.services.other_activities[1].getActivity('Charting')!
        let admin_other = bhm.services.other_activities[1].getActivity('Other (Clinical Supervision, Staff Meetings, Training, etc.)')!
        charting.hrs = inputs.service_unit_admin_bhm__charting
        admin_other.hrs = inputs.service_unit_admin_bhm__charting


        cp.services.direct_activities[0].getActivity('Direct Treatment: Assessment Visit')!.hrs = inputs.service_unit_direct_cp_treatment_visit
        cp.services.direct_activities[0].getActivity('Direct Treatment: Follow-up Visits')!.hrs = inputs.service_unit_direct_cp_follow_up
        cp.services.other_activities[0].getActivity('Registry Review')!.hrs = inputs.service_unit_other_cp_registry_review
        cp.services.other_activities[0].getActivity('Direct PCP Communication')!.hrs = inputs.service_unit_other_cp_direct_pcp_communication
        cp.services.other_activities[0].getActivity('Caseload and Patient Review with BH Care Manager')!.hrs = inputs.service_unit_other_cp_caseload_review
        cp.services.other_activities[0].getActivity('Charting')!.hrs = inputs.service_unit_other_cp_charting
        cp.services.other_activities[0].getActivity('Other (Research, Staff Meetings, Training, etc.)')!.hrs = inputs.service_unit_other_cp_other

        this.billingRatesCollection.getBillingRate('Not Seen or Threshold Not Met')!.percent_of_eligible_patients = inputs.billing_rate_not_seen__patients
        this.billingRatesCollection.getBillingRate('Not Seen or Threshold Not Met')!.avg_reimbursement_amount = inputs.billing_rate_not_seen__avg_amount
        this.billingRatesCollection.getBillingRate('NEW! 30 min ANY month (G2214)')!.percent_of_eligible_patients = inputs.billing_rate_G2214__patients
        this.billingRatesCollection.getBillingRate('NEW! 30 min ANY month (G2214)')!.avg_reimbursement_amount = inputs.billing_rate_G2214__avg_amount
        this.billingRatesCollection.getBillingRate('70 Initial Month Minutes (99492 )')!.percent_of_eligible_patients = inputs.billing_rate_99492__patients
        this.billingRatesCollection.getBillingRate('70 Initial Month Minutes (99492 )')!.avg_reimbursement_amount = inputs.billing_rate_99492__avg_amount
        this.billingRatesCollection.getBillingRate('100 Initial Minutes (99492 + 99494)')!.percent_of_eligible_patients = inputs.billing_rate_99492_99494__patients
        this.billingRatesCollection.getBillingRate('100 Initial Minutes (99492 + 99494)')!.avg_reimbursement_amount = inputs.billing_rate_99492_99494__avg_amount
        this.billingRatesCollection.getBillingRate('130 Initial Minutes (99492 + 99494 x 2)')!.percent_of_eligible_patients = inputs.billing_rate_99492_99494x2__patients
        this.billingRatesCollection.getBillingRate('130 Initial Minutes (99492 + 99494 x 2)')!.avg_reimbursement_amount = inputs.billing_rate_99492_99494x2__avg_amount
        this.billingRatesCollection.getBillingRate('60 Subsequent Month Minutes (99493 )')!.percent_of_eligible_patients = inputs.billing_rate_99493__patients
        this.billingRatesCollection.getBillingRate('60 Subsequent Month Minutes (99493 )')!.avg_reimbursement_amount = inputs.billing_rate_99493__avg_amount
        this.billingRatesCollection.getBillingRate('90 Subsequent Minutes (99493 + 99494)')!.percent_of_eligible_patients = inputs.billing_rate_99493_99494__patients
        this.billingRatesCollection.getBillingRate('90 Subsequent Minutes (99493 + 99494)')!.avg_reimbursement_amount = inputs.billing_rate_99493_99494__avg_amount
        this.billingRatesCollection.getBillingRate('120 Subsequent Minutes (99493 + 99494 x 2)')!.percent_of_eligible_patients = inputs.billing_rate_99493_99494x2__patients
        this.billingRatesCollection.getBillingRate('120 Subsequent Minutes (99493 + 99494 x 2)')!.avg_reimbursement_amount = inputs.billing_rate_99493_99494x2__avg_amount

        this.staffCollection.setStaffMember(bhm)
        this.staffCollection.setStaffMember(cp)

    }
}