
import { BaseService } from './base';

export class RegistryService extends BaseService {

    constructor() {
        super();
    }

    async createRegistry(api_url: string, token: string, payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/create";
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'post',
            endpoint: endpoint,
            token: token,
            payload: payload,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async referPatient(api_url: string, token: string, registry_id: string, referral: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/refer-patient";
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'post',
            endpoint: endpoint,
            token: token,
            payload: referral,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async getMembers(api_url: string, token: string, registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/team-members";
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'get',
            endpoint: endpoint,
            token: token,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async getRegistryPatients(api_url: string, token: string, registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + '/patients' ;
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'get',
            endpoint: endpoint,
            token: token,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    
    }

    async saveTreatmentSession(api_url: string, token: string, registry_id: string,  session: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/record-session";
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'post',
            endpoint: endpoint,
            payload: session,
            token: token,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async setFlag(api_url: string, token: string, registry_id: string, mrn: string, flag: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/patient-attribute";
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'post',
            endpoint: endpoint,
            payload: {
                mrn: mrn,
                attr_name: 'patient_flag',
                attr_value: flag
            },
            token: token,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async setStatus(api_url: string, token: string, registry_id: string,  mrn: string, status: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/patient-attribute";
        const resp = this.apiRequest({
            api_url: api_url,
            method: 'post',
            endpoint: endpoint,
            payload: {
                mrn: mrn,
                attr_name: 'status',
                attr_value: status
            },
            token: token,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

}
