
import { AkelloClient } from '../client';
import { BaseService } from './base';

export class PatientService extends BaseService {

    constructor(client: AkelloClient) {
        super(client);
    }

    async getPatient(onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "patient";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    }

    async getInvites(onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "patient/invites";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    }

    async acceptInvite(payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "patient/invites/accept";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'put',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: payload,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    }

    async declineInvite(payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "patient/invites/decline";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'put',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: payload,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    }
}