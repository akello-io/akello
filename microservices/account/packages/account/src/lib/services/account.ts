
import { BaseService } from './base';


export  interface IAccountService {
    getAccount(accessToken: string, accountId: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void): void;
}

export class AccountService extends BaseService implements IAccountService {
    baseURL: string;

    constructor(
        baseURL: string
    ) {
        super();
        this.baseURL = baseURL;
    }

    async getAccount(accessToken: string, accountId: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        // set values from environment variables
        const endpoint =  "account/" + accountId;
        this.apiRequest({
            api_url: this.baseURL,
            method: 'get',
            endpoint: endpoint,
            token: accessToken!,
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