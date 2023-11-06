import { getUser,  getUserRegistries } from './user'
import {createRegistry, referPatient, getMembers, getRegistryPatients, saveTreatmentSession, setFlag, setStatus} from "./registry";
import {getRegistryStats} from "./reports";

export default class AkelloAPIService {

    token: string

    constructor(token: string) {
        this.token = token
    }

    getUser(onSuccess: any, onFail: any) {
        return getUser(this.token, onSuccess, onFail)
    }

    getUserRegistries(onSuccess: any, onFail: any) {
        return getUserRegistries(this.token, onSuccess, onFail)
    }

    createRegistry(payload: any, onSuccess: any, onFail: any) {
        return createRegistry(this.token, payload, onSuccess, onFail)
    }

    referPatient(registry_id: string, onSuccess: any, onFail: any) {
        return referPatient(this.token, registry_id, onSuccess, onFail)
    }

    getMembers(registry_id: string, onSuccess: any, onFail: any) {
        return getMembers(this.token, registry_id, onSuccess, onFail)
    }

    getRegistryPatients(registry_id: string, onSuccess: any, onFail: any) {
        return getRegistryPatients(this.token, registry_id, onSuccess, onFail)
    }

    saveTreatmentSession(registry_id: string, session: any, onSuccess: any, onFail: any) {
        return saveTreatmentSession(this.token, registry_id, session, onSuccess, onFail)
    }

    setPatientFlag(registry_id: string, mrn: string, flag: string, onSuccess: any, onFail: any) {
        return setFlag(this.token, registry_id, mrn, flag, onSuccess, onFail)
    }

    setPatientStatus(registry_id: string, mrn: string, status: string, onSuccess: any, onFail: any) {
        return setStatus(this.token, registry_id, mrn, status, onSuccess, onFail)
    }
}