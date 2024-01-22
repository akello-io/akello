import {apiRequest} from "./utils";



export const getBillingReport = async (api_url: string, token: string, registry_id:string, from_date: number, to_date: number,  onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "reports/" + registry_id + "/billing?from_date=" + from_date + "&to_date=" + to_date;
    const resp = await apiRequest({
        api_url: api_url,
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


export const getRegistryStats = async (api_url: string, registry_id: string, from_date: number, to_date: number, token: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "reports/" + registry_id + "/dashboard-stats?from_date=" + from_date + "&to_date=" + to_date;
    const resp = await apiRequest({
        api_url: api_url,
        method: 'get',
        endpoint: endpoint,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}
