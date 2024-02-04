import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import { Auth } from "aws-amplify";
import {DataGrid, GridEventListener, GridToolbar} from '@mui/x-data-grid';
import FinancialModelDBRecordTypeV1 from "../../data/schemas/FinancialModel";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { useAkello } from "@akello/react-hook";


const VisibleColumnsBasicExample = () => {
    const navigate = useNavigate()
    const [models, setModels] = useState<FinancialModelDBRecordTypeV1[]>([])
    const token = useSelector((state: RootState) => state.app.token)
    const akello = useAkello()


    useEffect(() => {        
        akello.financialService.getFinancialModels(token, (financial_models) => {
            setModels(financial_models)
        }, (error) => {
        })
    }, [token])

    const handleEvent: GridEventListener<'rowClick'> = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        // params.row.name
        navigate('/models/' + params.row.name, {state: {'model': params.row}})
        // setMessage(`Movie "${params.row.title}" clicked`);
    };

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">

                    <p className="mt-2 text-sm text-gray-700">
                        A list of financial models for CoCM. Compare various scenarios and benchmark against your existing program.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-ak-yellow px-6 py-4 text-center text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => navigate('/models/create')}
                    >
                        Build model
                    </button>
                </div>
            </div>
            <div >
                <DataGrid
                    onRowClick={handleEvent}
                    columns={[
                        { field: 'name', hideable: false },
                        { field: 'description', headerName: 'Description' },
                        { field: 'address_state', headerName: 'State', width: 120 },
                        { field: 'full_time_pcps', headerName: "Full Time PCP's", width: 120 },
                        { field: 'pct_pcps_participation', headerName: "% PCP Participation", width: 150 },
                        { field: 'monthly_pcp_refferals', headerName: "Monthly PCP Referrals", width: 180 },
                        { field: 'pct_patients_accepting_cocm', headerName: "% Patients Accepting CoCM", width: 180 },
                        { field: 'pct_patients_graduating', headerName: "% Patients Graduating", width: 180 },

                        { field: 'payer_distribution_medicare', headerName: "% Medicare", width: 180 },
                        { field: 'payer_distribution_medicare_cocm_expected', headerName: "% Medicare - CoCM eligible", width: 180 },

                        { field: 'payer_distribution_medicaid', headerName: "% Medicaid", width: 180 },
                        { field: 'payer_distribution_medicaid_cocm_expected', headerName: "% Medicaid - CoCM eligible", width: 180 },

                        { field: 'payer_distribution_commercial_cocm', headerName: "% Commercial CoCM OK", width: 180 },
                        { field: 'payer_distribution_commercial_cocm_cocm_expected', headerName: "% Commercial CoCM OK - CoCM eligible", width: 180 },

                        { field: 'payer_distribution_commercial_no_cocm', headerName: "% Commercial w/ CoCM", width: 180 },

                        { field: 'caseload_complexity_pct_patients_suicidality', headerName: "% Suicidality", width: 180 },
                        { field: 'caseload_complexity_pct_patients_prior_ed', headerName: "% Emergency Department", width: 180 },
                        { field: 'caseload_complexity_pct_patients_substance_abuse', headerName: "% Substance Abuse", width: 180 },
                        { field: 'caseload_complexity_pct_patients_above_moderate', headerName: "% Above Moderate", width: 180 },
                    ]}
                    rows={models}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>

    );
}

const FinancialModelList = () => {

    return (
        <div className={"py-12"}>
            <VisibleColumnsBasicExample />
        </div>
    )
}
export default FinancialModelList

