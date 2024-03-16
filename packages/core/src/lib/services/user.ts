
import { AkelloClient } from '../client';
import { BaseService } from './base';

export class UserService extends BaseService {

    constructor(client: AkelloClient) {
        super(client);        
    }

    async updateProfilePhoto(data: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "user/profile_photo";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            file_upload: true,
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: data,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    }

    async createUser(data: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {

        const endpoint =  "user";

        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: data,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });
    }
    

    async getUser(onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "user";
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

    async getUserSessions(onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "user/sessions";
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
    
    async getUserRegistries(onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "user/registries";
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
    