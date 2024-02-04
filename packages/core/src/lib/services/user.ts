
import { AkelloClient } from '../client';
import { BaseService } from './base';

export class UserService extends BaseService {

    constructor(client: AkelloClient) {
        super(client);        
    }

    async getUser(token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "user";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
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
    
    async getUserRegistries(token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "user/registries";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
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
    

}
    