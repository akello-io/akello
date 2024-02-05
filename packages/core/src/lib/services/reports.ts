import { AkelloClient } from '../client';
import { BaseService } from './base';

export class ReportsService extends BaseService {
    
    constructor(client: AkelloClient) {
        super(client);        
    }


    async getBillingReport(registry_id:string, from_date: number, to_date: number,  onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "reports/" + registry_id + "/billing?from_date=" + from_date + "&to_date=" + to_date;
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
    async getRegistryStats(registry_id: string, from_date: number, to_date: number, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "reports/" + registry_id + "/dashboard-stats?from_date=" + from_date + "&to_date=" + to_date;
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }
    



}