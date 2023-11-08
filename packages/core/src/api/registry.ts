import {apiRequest} from "./utils";


export const createRegistry = async (token: string, payload: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/create";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        token: token,
        payload: payload,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}



export const referPatient = async (token: string, registry_id: string, referral: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/refer-patient";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        token: token,
        payload: referral,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}




export const getMembers = async ( token: string, registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/team-members";
    const resp = await apiRequest({
        method: 'get',
        endpoint: endpoint,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}



export const getRegistryPatients = async (token: string, registry_id: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + '/patients' ;
    const resp = await apiRequest({
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


export const saveTreatmentSession = async (token: string, registry_id: string,  session: any, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/record-session";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        payload: session,
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}

export const setFlag = async (token: string, registry_id: string, mrn: string, flag: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/patient-attribute";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        payload: {
            mrn: mrn,
            attr_name: 'patient_flag',
            attr_value: flag
        },
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}

export const setStatus = async (token: string, registry_id: string,  mrn: string, status: string, onSuccess: (data: any) => void, onFail?: (data: any) =>  void)  => {
    const endpoint =  "registry/" + registry_id + "/patient-attribute";
    const resp = await apiRequest({
        method: 'post',
        endpoint: endpoint,
        payload: {
            mrn: mrn,
            attr_name: 'status',
            attr_value: status
        },
        token: token,
        onSuccess: (resp: any) => {
            onSuccess(resp)
        }, onFail: (error: any) => {
        }
    });
}



