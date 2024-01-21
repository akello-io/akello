import {Patient, ContactPoint, HumanName} from "fhir/r4";
import {types} from "sass";
import Error = types.Error;


export class PatientResource{
    patient: Patient

    constructor(patient: Patient) {
        debugger;
        this.patient = patient
    }

    getName(use: string = 'official'): HumanName {
        let match = this.patient.name!.filter((name) => name.use == use)
        if(match.length == 1) {
            return match[0]
        }
        throw new Error("Name not found")
    }

    getPhoneNumber(use: string = 'home') {
        let match = this.patient.telecom!.filter((telecom) => telecom.use == use)
        if(match.length == 1) {
            return match[0]
        }
        throw new Error("Name telecom found")
    }
}