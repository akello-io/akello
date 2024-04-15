
import { AkelloClient } from '../client';
import { BaseService } from './base';

export class PatientService extends BaseService {

    constructor(client: AkelloClient) {
        super(client);
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
}