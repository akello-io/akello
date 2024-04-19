
import { AkelloClient } from '../client';
import { BaseService } from './base';
import { Measurement } from '../models';

export class MeasurementService extends BaseService {

    constructor(client: AkelloClient) {
        super(client);
    }

    async logTime(measurement: Measurement, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "measurement/timelog";
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: this.client.accessToken!,
            payload: measurement,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                this.handleFail(error, onFail)
            }
        });
    }

    async getTimeLogs(registry_id: string, user_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "measurement/timelog?registry_id=" + registry_id + "&user_id=" + user_id;
        const resp = this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: this.client.accessToken!,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                onFail!(error)
            }
        });
    }


}