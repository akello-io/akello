import { AkelloClient } from '../client';
import { BaseService } from './base';

export class RegistryService extends BaseService {
    
    constructor(client: AkelloClient) {
        super(client);        
    }

    async createRegistry(payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/create";            
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: payload,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {        
                
            }
        });
    }

    async referPatient(registry_id: string, referral: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/refer-patient";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: referral,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    async getMembers(registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/team-members";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    async getRegistryPatients(registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + '/patients' ;
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    
    }

    async saveTreatmentSession(registry_id: string,  session: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/record-session";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: session,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    async setFlag(registry_id: string, mrn: string, flag: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/patient-attribute";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: {
                mrn: mrn,
                attr_name: 'patient_flag',
                attr_value: flag
            },
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async setStatus(registry_id: string,  mrn: string, status: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "registry/" + registry_id + "/patient-attribute";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            payload: {
                mrn: mrn,
                attr_name: 'status',
                attr_value: status
            },
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

}
