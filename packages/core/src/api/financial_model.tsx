import {apiRequest} from "./utils";
import {Clinic} from "../data/aims_model/clinic";
import FinancialModelDBRecordTypeV1 from "../data/schemas/FinancialModel";


export const getFinancialModel = async (name: string, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model/" + name;
    const resp = await apiRequest({
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

export const getFinancialModels = async (token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model";
    const resp = await apiRequest({
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

export const createFinancialModel = async (token: string, model: Clinic, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model";

    const resp = await apiRequest({
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

export const saveFinancialModel = async (token: string, model: Clinic, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "financial-model";

    const resp = await apiRequest({
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
