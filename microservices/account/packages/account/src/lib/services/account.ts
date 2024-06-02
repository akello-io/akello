
import { BaseService } from './base';

// set values from environment variables
const BASE_URL = import.meta.env.VITE_API_URL;

export class AccountService extends BaseService {

    async getAccount(accessToken: string, accountId: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "account/" + accountId;
        this.apiRequest({
            api_url: BASE_URL!,
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