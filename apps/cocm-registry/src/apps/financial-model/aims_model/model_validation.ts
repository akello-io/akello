import {Clinic} from "./clinic";
import {StaffType} from "./staff";


export const validate_model = (model: Clinic) =>  {

    let errors = []

    if(model.name == "" || model.name == undefined) {
        errors.push("Name must be set for this model")
    }

    if(model.description == "" || model.description == undefined) {
        errors.push("Description must be set for this model")
    }



    if(model.address_state == "" || model.address_state == undefined) {
        errors.push("State must be selected")
    }
    /*
    if(model.address_street == "" || model.address_street == undefined) {
        errors.push("Street address of your facility must be set for this model")
    }

    if(model.address_city == "" || model.address_city == undefined) {
        errors.push("The city of your facility must be set for this model")
    }

    if(model.address_zipcode == "" || model.address_zipcode == undefined) {
        errors.push("The zipcode of your facility must be set for this model")
    }
     */

    if(!model.staffCollection.full_time_pcps || model.staffCollection.full_time_pcps == 0) {
        errors.push("You must have more than zero full-time PCP's staffed")
    }

    if(!model.staffCollection.full_time_pcps_cocm_percent || model.staffCollection.full_time_pcps_cocm_percent == 0) {
        errors.push("You must have a more than 0% of PCP's participating")
    }

    if(!model.caseLoadCapacity.pcpReferrals || model.caseLoadCapacity.pcpReferrals == 0) {
        errors.push("You must have a more than 0% of of PCP Referrals")
    }

    if(!model.caseLoadCapacity.patientCVR || model.caseLoadCapacity.patientCVR == 0) {
        errors.push("You must have a more than 0% of patients accepting")
    }

    if(!model.caseLoadCapacity.graduationRate || model.caseLoadCapacity.graduationRate == 0) {
        errors.push("You must have a more than 0% of patients graduating")
    }

    let medicare = model.payerCollection.getPayer("Medicare")
    let medicaid = model.payerCollection.getPayer("Medicaid")
    let cocm_OK = model.payerCollection.getPayer("Commercial OK for CoCM")
    let cocm_OTHER = model.payerCollection.getPayer("Commercial other")

    if(medicare.patients_per_payer + medicaid.patients_per_payer + cocm_OK.patients_per_payer + cocm_OTHER.patients_per_payer !=1) {
        errors.push("Payer mix does not sum up to 100%")
    }

    let careManager = model.staffCollection.getStaffMember(StaffType.CareManager)!
    let psychiatrist = model.staffCollection.getStaffMember(StaffType.Psychiatrist)!

    if(careManager.salary_per_fte <= 0) {
        errors.push("Care Manager Salary needs to be greater than zero")
    }

    if(careManager.fringe_benefits_percent_of_salary <= 0) {
        errors.push("Care Manager benefits needs to be greater than zero")
    }

    if(psychiatrist.salary_per_fte <= 0) {
        errors.push("Care Manager Salary needs to be greater than zero")
    }


    return errors
}