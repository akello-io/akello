import {apiRequest} from "./utils";
import {Clinic} from "../data/aims_model/clinic";
import FinancialModelDBRecordTypeV1 from "../data/schemas/FinancialModel";


export const getFinancialModel = async (api_url: string, name: string, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model/" + name;
    const resp = await apiRequest({
        api_url: api_url,
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

export const getFinancialModels = async (api_url: string, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model";
    const resp = await apiRequest({
        api_url: api_url,
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

export const createFinancialModel = async (api_url: string, token: string, model: Clinic, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model";

    const resp = await apiRequest({
        api_url: api_url,
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

export const saveFinancialModel = async (api_url: string, token: string, model: Clinic, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model";

    const resp = await apiRequest({
        api_url: api_url,
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
