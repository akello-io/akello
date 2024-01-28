import '../../../index.css';

import {DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridValueGetterParams, GridToolbar} from "@mui/x-data-grid";
import moment from "moment";
import {PatientRegistry, Questionnaire, TreatmentLog} from "@akello/core";
import * as React from "react";



interface RegistryDataGridProps {
    patients: PatientRegistry[]
    questionnaires: Questionnaire[]
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
                    return new Date(params.row.initial_assessment)
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
                    return new Date(params.row.last_follow_up)
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
                    return new Date(params.row.last_psychiatric_consult)
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
                    return new Date(params.row.relapse_prevention_plan)
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
                    var ia = moment(params.row.initial_assessment);
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
        console.log(questionnaire.name)
        const first_column = {
            "field": questionnaire.uid + '_first',
            "headerName": questionnaire.uid + ' Initial',
            "description": "Initial baseline " + questionnaire.uid + " screening",
            "type": "number",
            "width": 110,
            "editable": true,
            valueGetter: (params: GridValueGetterParams<any, any>) => {
                if (params.row.treatment_logs.length > 0) {
                    let element = params.row.treatment_logs[0].scores.find((element: any) => element.score_name == questionnaire.uid + "_score")
                    if(element) {
                        return element.score_value
                    }

                }
            }
        }
        const last_column = {
            "field": questionnaire.uid + '_first',
            "headerName": questionnaire.name + ' Last',
            "description": "Most recent " + questionnaire.uid + " screening",
            "type": "number",
            "width": 110,
            "editable": true,
            valueGetter: (params: GridValueGetterParams<any, any>) => {
                if (params.row.treatment_logs.length > 0) {
                    let element = params.row.treatment_logs[params.row.treatment_logs.length - 1].scores.find((element: any) => element.score_name == questionnaire.uid + "_score")
                    if(element) {
                        return element.score_value
                    }
                }
            }
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