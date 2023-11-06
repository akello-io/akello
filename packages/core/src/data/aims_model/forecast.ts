import {Clinic} from "./clinic";
import {StaffType} from "./staff";


export class Forecast {

    constructor() {
    }

    run(aims: Clinic, months: number): Clinic[] {
        let forecast = [] as Clinic[]

        let referrals = aims.staffCollection.full_time_pcps! * aims.staffCollection.full_time_pcps_cocm_percent! * aims.caseLoadCapacity.pcpReferrals! * aims.caseLoadCapacity.patientCVR!

        aims.caseLoadCapacity.override_monthly_capacity = referrals
        forecast.push(aims)

        Array.from(Array(months).keys()).forEach((month) => {
            aims = this.getNextMonth(aims)
            let graduates = aims.caseLoadCapacity.override_monthly_capacity! * aims.caseLoadCapacity.graduationRate!
            let new_capacity = aims.caseLoadCapacity.override_monthly_capacity! + referrals - graduates
            aims.caseLoadCapacity.override_monthly_capacity = new_capacity
            forecast.push(aims)
        })
        return forecast
    }

    getNextMonth(aims: Clinic): Clinic {
        let aims_copy = aims.copy()
        // let fte_bhms = aims_copy.staffCollection.getCareManagerFTECnt(aims_copy.caseLoadCapacity.override_monthly_capacity!)
        let fte_bhms = aims_copy.staffCollection.getCareManagerFTECnt(aims_copy.caseLoadCapacity)
        let careManager = aims_copy.staffCollection.getStaffMember(StaffType.CareManager)
        let psychiatrist = aims_copy.staffCollection.getStaffMember(StaffType.Psychiatrist)
        careManager!.fte = fte_bhms
        psychiatrist!.fte = aims_copy.staffCollection.getPsychiatristFTECnt()
        return aims_copy
    }

}