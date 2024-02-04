import { AkelloClient } from '../client';
import { BaseService } from './base';
import {Clinic} from "../data/aims_model/clinic";
import FinancialModelDBRecordTypeV1 from "../data/schemas/FinancialModel";

export class FinancialModelService extends BaseService {
    
    constructor(client: AkelloClient) {
        super(client);        
    }



async getFinancialModel( name: string, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void){
    const endpoint =  "financial-model/" + name;
    this.apiRequest({
        api_url: this.client.getOptions().baseUrl!,
        method: 'get',
        endpoint: endpoint,
        token: token,
        onSuccess: (resp: FinancialModelDBRecordTypeV1[]) => {
            onSuccess(resp[0])
        },
        onFail: (error: any) => {
            if(onFail) {
                onFail(error)
            }
        }
    });

}

    async getFinancialModels(token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void){
        const endpoint =  "financial-model";
        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'get',
            endpoint: endpoint,
            token: token,
            onSuccess: (resp: FinancialModelDBRecordTypeV1[]) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
                if(onFail) {
                    onFail(error)
                }
            }
        });

    }

    async createFinancialModel(token: string, model: Clinic, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "financial-model";

        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'post',
            endpoint: endpoint,
            token: token,
            payload: model,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }

    async saveFinancialModel(token: string, model: Clinic, onSuccess: (data: any) => void, onFail?: (data: any) =>  void) {
        const endpoint =  "financial-model";

        this.apiRequest({
            api_url: this.client.getOptions().baseUrl!,
            method: 'put',
            endpoint: endpoint,
            token: token,
            payload: model,
            onSuccess: (resp: any) => {
                onSuccess(resp)
            }, onFail: (error: any) => {
            }
        });
    }
}
