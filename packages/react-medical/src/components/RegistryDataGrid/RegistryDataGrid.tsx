import {DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar} from "@mui/x-data-grid";
import moment from "moment";
import {PatientRegistry, TreatmentLog} from '@akello/core';
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material";


const columns: GridColDef[] = [
    {
        field: 'patient_flag',
        headerName: 'Flag',
        width: 210,
    },
    {
        field: 'patient_mrn',
        headerName: 'MRN',
    },
    {
        field: 'first_name',
        headerName: 'First name',
        description: 'The identification used by the person with access to the online service.',
    },
    {
        field: 'last_name',
        headerName: 'Last name',
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'Patient Status: E - Enrolled, T - Treatment, RPP - Relapse Prevention Plan, D - Deactivated',
        type: 'string',
        width: 110,
        editable: true,
    },
    {
        field: 'phq9_first',
        headerName: 'First',
        description: 'First baseline PHQ9 screening',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'phq9_last',
        headerName: 'Last',
        description: 'Most recent PHQ9 screening',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'phq9_last_delta',
        headerName: 'Last Delta',
        description: '',
        type: 'number',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.phq9_last && params.row.treatment_logs.length >= 2) {
                let first = params.row.treatment_logs[params.row.treatment_logs.length-2]
                let next = params.row.treatment_logs[params.row.treatment_logs.length-1]

                if(first.phq9_score !=0 ) {
                    return ((next.phq9_score - first.phq9_score)/first.phq9_score * 100).toFixed(0)
                }
            }
        }
    },
    {
        field: 'phq9_last_date',
        headerName: 'Last Date',
        description: 'Date of most recent PHQ9 screening',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.phq9_last_date) {
                return new Date(params.row.phq9_last_date * 1000)
            }
        }
    },
    {
        field: 'gad7_first',
        headerName: 'First',
        description: 'First baseline GAD7 screening.',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'gad7_last',
        headerName: 'Last',
        description: 'Most recent GAD7 screening.',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'gad7_last_delta',
        headerName: 'Last Delta',
        description: '',
        type: 'number',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.gad7_last && params.row.treatment_logs.length >= 2) {
                let first = params.row.treatment_logs[params.row.treatment_logs.length-2]
                let next = params.row.treatment_logs[params.row.treatment_logs.length-1]

                if(first.gad7_score !=0 ) {
                    return ((next.gad7_score - first.gad7_score)/first.gad7_score * 100).toFixed(0)
                }
            }
        }
    },
    {
        field: 'gad7_last_date',
        headerName: 'Last Date',
        description: 'Date of last GAD7 screening.',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.gad7_last_date) {
                return new Date(params.row.gad7_last_date * 1000)
            }
        }
    },
    {
        field: 'initial_assessment',
        headerName: 'I/A',
        description: 'Date of the most recent initial assessment.',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.initial_assessment) {
                return new Date(params.row.initial_assessment * 1000)
            }
        }
    },
    {
        field: 'last_follow_up',
        headerName: 'F/U',
        description: 'Date of the most recent Follow Up, excluding those marked as no patient contact.',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.last_follow_up) {
                return new Date(params.row.last_follow_up * 1000)
            }
        }
    },
    {
        field: 'last_psychiatric_consult',
        headerName: 'P/C',
        description: 'Date of most recent Psychiatric Consultation',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.last_psychiatric_consult) {
                return new Date(params.row.last_psychiatric_consult * 1000)
            }
        }
    },
    {
        field: 'relapse_prevention_plan',
        headerName: 'R/P',
        description: 'Date of most recent Relapse Prevention Plan.',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.relapse_prevention_plan) {
                return new Date(params.row.relapse_prevention_plan * 1000)
            }
        }
    },
    {
        field: 'total_sessions',
        headerName: '# Session',
        type: 'string',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            return params.row.treatment_logs.length
        }
    },
    {
        field: 'payer',
        headerName: 'Payer',
        type: 'string',
        width: 210,
    },
    {
        field: 'weeks_since_initial_assessment',
        headerName: 'Weeks Since I/A',
        type: 'number',
        width: 150,
        editable: true,
        valueGetter: (params) => {
            if(params.row.initial_assessment) {
                var ia = moment(params.row.initial_assessment * 1000);
                var today = moment();
                var diff = moment.duration(today.diff(ia));
                return diff.years() * 52 + diff.weeks()
            }
        }
    },
    {
        field: 'minutes_this_month',
        headerName: 'Minutes this month',
        description: 'The sum of all minutes recorded for the patient during the current calendar month.',
        type: 'number',
        width: 150,
        editable: true,
        valueGetter: (params) => {
            let total = 0
            params.row.treatment_logs.map((treatment_log: TreatmentLog) => {
                total += treatment_log.minutes!
            })
            return total
        }
    },

];

const columnGroupingModel: GridColumnGroupingModel = [
    {
        groupId: 'PHQ 9',
        children: [
            { field: 'phq9_first' }, { field: 'phq9_last'}, { field: 'phq9_last_delta'}, { field: 'phq9_last_date'}
        ],
    },
    {
        groupId: 'GAD 7',
        children: [
            { field: 'gad7_first' }, { field: 'gad7_last'}, { field: 'gad7_last_delta'}, { field: 'gad7_last_date'}
        ],
    },
    {
        groupId: 'Contact',
        children: [
            { field: 'contact_i_a' }, { field: 'contact_f_u'}
        ],
    },
];

export interface RegistryDataGridProps {
    patients: PatientRegistry[]
    handlePatientClickEvent: GridEventListener<'rowClick'>
}

export const RegistryDataGrid: React.FC<RegistryDataGridProps> = ({ patients, handlePatientClickEvent }: RegistryDataGridProps) => {
    const theme = document.querySelector("html")!.getAttribute('data-theme')
    const darkTheme = createTheme({
        palette: {
            mode: theme=='dark' ? 'dark' : 'light',
        },
    });
    return (
        <>
            <div className={"bg-base-100 text-base-content"}>            
                <ThemeProvider theme={darkTheme}>
                    <DataGrid
                        onRowClick={handlePatientClickEvent}
                        rows={patients}
                        getRowId={(row) => row.patient_mrn}
                        columns={columns}
                        experimentalFeatures={{ columnGrouping: true }}
                        columnGroupingModel={columnGroupingModel}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                    />
                </ThemeProvider>

            </div>

        </>
    )
}

export default RegistryDataGrid