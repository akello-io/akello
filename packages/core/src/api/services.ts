import { getUser,  getUserRegistries } from './user'
import {createRegistry, referPatient, getMembers, getRegistryPatients, saveTreatmentSession, setFlag, setStatus} from "./registry";
import {getRegistryStats} from "./reports";

export default class AkelloAPIService {

    token: string
    api_url: string

    constructor(api_url: string, token: string) {
        this.token = token
        this.api_url = api_url
    }

    getUser(onSuccess: any, onFail: any) {
        return getUser(this.api_url, this.token, onSuccess, onFail)
    }

    getUserRegistries(onSuccess: any, onFail: any) {
        return getUserRegistries(this.api_url, this.token, onSuccess, onFail)
    }

    createRegistry(payload: any, onSuccess: any, onFail: any) {
        return createRegistry(this.api_url, this.token, payload, onSuccess, onFail)
    }

    referPatient(registry_id: string, onSuccess: any, onFail: any) {
        return referPatient(this.api_url, this.token, registry_id, onSuccess, onFail)
    }

    getMembers(registry_id: string, onSuccess: any, onFail: any) {
        return getMembers(this.api_url, this.token, registry_id, onSuccess, onFail)
    }

    getRegistryPatients(registry_id: string, onSuccess: any, onFail: any) {
        return getRegistryPatients(this.api_url, this.token, registry_id, onSuccess, onFail)
    }

    saveTreatmentSession(registry_id: string, session: any, onSuccess: any, onFail: any) {
        return saveTreatmentSession(this.api_url, this.token, registry_id, session, onSuccess, onFail)
    }

    setPatientFlag(registry_id: string, mrn: string, flag: string, onSuccess: any, onFail: any) {
        return setFlag(this.api_url, this.token, registry_id, mrn, flag, onSuccess, onFail)
    }

    setPatientStatus(registry_id: string, mrn: string, status: string, onSuccess: any, onFail: any) {
        return setStatus(this.api_url, this.token, registry_id, mrn, status, onSuccess, onFail)
    }
}