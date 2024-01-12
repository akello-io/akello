import {DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar} from "@mui/x-data-grid";
import moment from "moment";
import {PatientRegistry, TreatmentLog} from "../../../data/schemas/RegistryModel";
import * as React from "react";



interface RegistryDataGridProps {
    patients: PatientRegistry[]
    questionnaires: any[]
    handlePatientClickEvent: GridEventListener<'rowClick'>
}

export const RegistryDataGrid:React.FC<RegistryDataGridProps> = ({patients, questionnaires, handlePatientClickEvent}) => {



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
            groupId: 'Contact',
            children: [
                { field: 'contact_i_a' }, { field: 'contact_f_u'}
            ],
        },
    ];


    questionnaires.map((questionnaire) => {
        console.log(questionnaire.title)
        const first_column = {
            "field": questionnaire.title + '_first',
            "headerName": questionnaire.title + ' Initial',
            "description": "Initial baseline " + questionnaire.title + " screening",
            "type": "number",
            "width": 110,
            "editable": true,
        }
        const last_column = {
            "field": questionnaire.title + '_last',
            "headerName": questionnaire.title + ' Last',
            "description": "Most recent " + questionnaire.title + " screening",
            "type": "number",
            "width": 110,
            "editable": true,
        }
        columns.push(first_column)
        columns.push(last_column)
    })


    return (
        <>
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
        </>
    )
}

export default RegistryDataGrid