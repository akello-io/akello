import {CaseloadVolumeCapacity} from "./caseload_capacity";

export enum StaffType {
    CareManager = 'CareManager',
    Psychiatrist = 'Psychiatrist'
}



export class Staff {

    type: StaffType
    name: string
    fte: number
    services: WeeklyServices
    annual_salary: number
    fringe_benefits_percent_of_salary: number
    get salary_per_fte() {
        return this.annual_salary * this.fte
    }
    get fringe_benefits_cost() {
        return this.salary_per_fte * this.fringe_benefits_percent_of_salary
    }
    get total_cost() {
        return this.salary_per_fte + this.fringe_benefits_cost
    }

    total_hours_per_week(hours_per_fte: number) {
        return this.fte * hours_per_fte
    }

    constructor(type: StaffType, name: string, fte: number, services: WeeklyServices, annual_salary: number, fringe_benefits_percent_of_salary: number) {
        this.type = type
        this.name = name
        this.fte = fte
        this.services = services
        this.annual_salary = annual_salary
        this.fringe_benefits_percent_of_salary = fringe_benefits_percent_of_salary
    }

    copy() {
        return new Staff(
            this.type,
            this.name,
            this.fte,
            this.services.copy(),
            this.annual_salary,
            this.fringe_benefits_percent_of_salary
        )
    }

    set(obj: any) {
        this.type = obj.type
        this.name = obj.name
        this.fte = obj.fte
        this.services.set(obj.services)
        this.annual_salary = obj.annual_salary
        this.fringe_benefits_percent_of_salary = obj.fringe_benefits_percent_of_salary
    }

}


export class StaffCollection {
    staff: Staff[]
    hours_per_fte: number
    working_weeks_per_year: number
    operational_overhead: number

    full_time_pcps?: number
    full_time_pcps_cocm_percent?: number

    constructor(
        staff: Staff[],
        operational_overhead: number,
        hours_per_fte?: number,
        working_weeks_per_year?: number,
    ) {
        this.staff = staff
        this.operational_overhead = operational_overhead

        if(hours_per_fte) {
            this.hours_per_fte = hours_per_fte
        } else {
            this.hours_per_fte = 40
        }

        if(working_weeks_per_year) {
            this.working_weeks_per_year = working_weeks_per_year
        } else {
            this.working_weeks_per_year = 47
        }

    }

    getStaffMember(type: StaffType) {
        return this.staff.find((staff) => staff.type == type)
    }

    setStaffMember(staffInput: Staff) {
        let idx = this.staff.findIndex((staff) => staff.type == staffInput.type)
        this.staff[idx] = staffInput
    }

    getCareManagerFTECnt(caseLoad: CaseloadVolumeCapacity) {

        // TODO: Check this with Jordana
        let monthly_capacity = caseLoad.override_monthly_capacity!
        let patients_per_bhm = 170

        if(
            caseLoad.pct_of_patients_with_substance_abuse! > .2 ||
            caseLoad.pct_of_patients_with_moderate! > .2 ||
            caseLoad.pct_patients_with_suicidality_risk! > 0 ||
            caseLoad.pct_of_patients_with_prior_mental_health_ED_visit! > .3
        ) {
            patients_per_bhm = 50
        }
        else if(
            caseLoad.pct_of_patients_with_substance_abuse! > .05 ||
            caseLoad.pct_of_patients_with_moderate! > .05 ||
            caseLoad.pct_of_patients_with_prior_mental_health_ED_visit! > .1
        ) {
            patients_per_bhm = 80
        }


        let recommended = Math.round(monthly_capacity /  patients_per_bhm)

        return recommended < 1 ? 1 : recommended
    }

    getPsychiatristFTECnt() {
        let careManager = this.getStaffMember(StaffType.CareManager)
        return ((careManager!.total_hours_per_week(this.hours_per_fte) / 40) * 3) / this.hours_per_fte
    }

    getEstimatedPsychiatristHRS(fteCareManagers: number) {
        return Math.round(fteCareManagers * 0.075 * this.hours_per_fte)
    }


    total_reimbursable_service_units(fte: number) {
        let care_manager_total = 0
        let psychatirst_total = 0
        this.staff.forEach((staff) => {

            staff.services.direct_activities.forEach((direct_activities)=> {

                    if(staff.type === StaffType.CareManager) {
                        care_manager_total += direct_activities.direct_treatment_assessment(this.working_weeks_per_year, fte)
                        care_manager_total += direct_activities.direct_treatment_ongoing(this.working_weeks_per_year, fte)
                        care_manager_total += direct_activities.group_treatment(this.working_weeks_per_year, fte)
                    }
                    if(staff.type === StaffType.Psychiatrist) {
                        psychatirst_total += direct_activities.direct_treatment_assessment(this.working_weeks_per_year, fte)
                        psychatirst_total += direct_activities.direct_treatment_ongoing(this.working_weeks_per_year, fte)
                        psychatirst_total += direct_activities.group_treatment(this.working_weeks_per_year, fte)
                    }
                }
            )
        })
        return {
            'care_manager': care_manager_total,
            'psychatirst': psychatirst_total
        }
    }

    get subtotal_personal_cost() {
        let subtotal = 0
        this.staff.forEach((staff) => {
            subtotal += staff.total_cost
        })
        return subtotal
    }

    get organizational_overhead() {
        return this.operational_overhead * this.subtotal_personal_cost
    }

    get total_cost() {
        return this.subtotal_personal_cost + this.organizational_overhead
    }


    copy() {
        let staff_collection_copy =  new StaffCollection(
            this.staff.map((staff) => staff.copy()),
            this.operational_overhead,
            this.hours_per_fte,
            this.working_weeks_per_year,
        )
        staff_collection_copy.full_time_pcps = this.full_time_pcps
        staff_collection_copy.full_time_pcps_cocm_percent = this.full_time_pcps_cocm_percent
        return staff_collection_copy
    }

    set(obj: any) {

        let bhmIdx1 = this.staff.findIndex((staffobj) => staffobj.type == StaffType.CareManager)
        let bhmIdx2 = obj.staff.findIndex((staffobj: Staff) => staffobj.type == StaffType.CareManager)


        this.staff[bhmIdx1].set(obj.staff[bhmIdx2])

        let cpIdx1 = this.staff.findIndex((staffobj) => staffobj.type == StaffType.Psychiatrist)
        let cpIdx2 = obj.staff.findIndex((staffobj: Staff) => staffobj.type == StaffType.Psychiatrist)
        this.staff[cpIdx1].set(obj.staff[cpIdx2])


        this.hours_per_fte = obj.hours_per_fte
        this.working_weeks_per_year = obj.working_weeks_per_year
        this.operational_overhead = obj.operational_overhead
        this.full_time_pcps = obj.full_time_pcps
        this.full_time_pcps_cocm_percent = obj.full_time_pcps_cocm_percent
    }

}



export class WeeklyServices {
    direct_activities: DirectStaffActivityCollection[]
    other_activities: OtherStaffActivityCollection[]

    get subtotal() {
        let total = 0

        this.direct_activities.forEach((collection) => {
            total += collection.subtotal_hrs
        })

        this.other_activities.forEach((collection) => {
            total += collection.subtotal_hrs
        })

        return total
    }

    constructor(direct_activities: DirectStaffActivityCollection[], other_activities: OtherStaffActivityCollection[]) {
        this.direct_activities = direct_activities
        this.other_activities = other_activities
    }

    copy() {
        let direct = this.direct_activities[0].copy()
        let other = [this.other_activities[0].copy()]
        if(this.other_activities[1]) {
            other.push(this.other_activities[1].copy())
        }


        return new WeeklyServices([direct], other)
    }

    set(obj: any) {
        this.direct_activities[0].set(obj.direct_activities[0])
        this.other_activities[0].set(obj.other_activities[0])

        if(obj.other_activities[1]) {
            this.other_activities[1].set(obj.other_activities[1])
        }

    }
}



export class DirectStaffActivityCollection {

    type: StaffType
    name: string
    activities: DirectStaffActivity[]

    constructor(type: StaffType, name: string, activities: DirectStaffActivity[]) {
        this.type = type
        this.name = name
        this.activities = activities
    }

    getActivity(name: string): DirectStaffActivity | undefined {
        return this.activities.find(activity => activity.name == name)
    }

    setActivity(activity: DirectStaffActivity) {
        let copyactivities = [...this.activities]
        let idx = this.activities.findIndex((a) => a.name == activity.name)
        copyactivities[idx] = activity
        this.activities = copyactivities
    }

    get subtotal_hrs() {
        let subtotal = 0
        this.activities.forEach((activity) => {
            subtotal += activity.hrs
        })
        return subtotal
    }

    subtotal_sug(fte: number) {
        let subtotal = 0
        this.activities.forEach((activity) => {
            subtotal += activity.service_units_generated(fte)
        })
        return subtotal
    }

    total_direct_annualized_services(working_weeks_per_year: number, fte: number) {
        return this.direct_treatment_assessment(working_weeks_per_year, fte) +
            this.direct_treatment_ongoing(working_weeks_per_year, fte) +
            this.group_treatment(working_weeks_per_year, fte)
    }

    direct_treatment_assessment(working_weeks_per_year: number, fte: number) {
        if(this.type === StaffType.CareManager) {
            let service_units_generated = this.getActivity('Initial Assessment Visit')?.service_units_generated(fte)
            if(service_units_generated) {
                return working_weeks_per_year * service_units_generated
            }
        }
        if(this.type === StaffType.Psychiatrist) {
            let service_units_generated = this.getActivity('Direct Treatment: Assessment Visit')?.service_units_generated(fte)
            if(service_units_generated) {
                return working_weeks_per_year * service_units_generated
            }
        }
        return 0
    }

    direct_treatment_ongoing(working_weeks_per_year: number, fte: number) {
        if(this.type === StaffType.CareManager) {
            let warm_sug =  this.getActivity('Warm Connection Visit 16 + min')?.service_units_generated(fte)
            let follow_up_sug =  this.getActivity('Follow Up Visit')?.service_units_generated(fte)
            if(warm_sug && follow_up_sug) {
                return working_weeks_per_year * (warm_sug + follow_up_sug)
            }
        }
        if(this.type === StaffType.Psychiatrist) {
            let direct_follow_up_sug =  this.getActivity('Direct Treatment: Follow-up Visits')?.service_units_generated(fte)
            if(direct_follow_up_sug) {
                return working_weeks_per_year * direct_follow_up_sug
            }
        }
        return 0
    }

    group_treatment(working_weeks_per_year: number, fte: number) {
        if(this.type == StaffType.CareManager) {
            let group_sug = this.getActivity('Group Treatment Visit')?.service_units_generated(fte)
            if(group_sug) {
                return working_weeks_per_year * group_sug
            }
        }
        return 0
    }

    copy() {
        return new DirectStaffActivityCollection(this.type, this.name, this.activities)
    }

    set(obj: any) {
        this.type = obj.type
        this.name = obj.name
        this.activities = []
        obj.activities.forEach((activity: DirectStaffActivity) => {
            this.activities.push(
                new DirectStaffActivity(
                    activity.name,
                    activity.hrs,
                    activity.hrs_per_service_unit
                )
            )
        })
    }
}

export class DirectStaffActivity {
    name: string
    hrs: number
    hrs_per_service_unit: number

    service_units_generated(fte: number) {
        return this.hrs  / this.hrs_per_service_unit
        // return (this.hrs * fte) / this.hrs_per_service_unit
    }

    constructor(name: string, hrs: number, hrs_per_service_unit: number) {
        this.name = name
        this.hrs = hrs
        this.hrs_per_service_unit = hrs_per_service_unit
    }

    copy() {
        return new DirectStaffActivity(this.name, this.hrs, this.hrs_per_service_unit)
    }

    set(obj: any) {
        this.name = obj.name
        this.hrs = obj.hrs
        this.hrs_per_service_unit = obj.hrs_per_service_unit
    }
}

export class OtherStaffActivityCollection {

    name: string
    activities: OtherStaffActivity[]

    constructor(name: string, activities: OtherStaffActivity[]) {
        this.name = name
        this.activities = activities
    }

    getActivity(name: string): OtherStaffActivity | undefined {
        return this.activities.find(activity => activity.name == name)
    }

    setActivity(activity: OtherStaffActivity) {
        this.activities.forEach((ref) => {
            if(ref.name === activity.name) {
                ref = activity
            }
        })
    }
    get subtotal_hrs() {
        let subtotal = 0
        this.activities.forEach((activity) => {
            subtotal += activity.hrs
        })
        return subtotal
    }

    copy() {
        return new OtherStaffActivityCollection(this.name, this.activities.map((activity) => activity.copy()))
    }

    set(obj: any) {
        this.name = obj.name
        this.activities = []
        obj.activities.forEach((activity: OtherStaffActivity) => {
            this.activities.push(
                new OtherStaffActivity(
                    activity.name,
                    activity.hrs
                )
            )
        })
    }
}

export class OtherStaffActivity {
    name: string
    hrs: number

    constructor(name: string, hrs: number) {
        this.name = name
        this.hrs = hrs
    }

    copy() {
        return new OtherStaffActivity(this.name, this.hrs)
    }

    set(obj: any) {
        this.name = obj.name
        this.hrs = obj.hrs
    }
}
