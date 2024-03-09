import {DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridValueGetterParams, GridToolbar} from "@mui/x-data-grid";
import moment from "moment";
import {PatientRegistry, Questionnaire, TreatmentLog} from "@akello/core";
import * as React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAkello } from "@akello/react-hook";

export interface RegistryDataGridProps {
    patients: PatientRegistry[]
    questionnaires: Questionnaire[]
    handlePatientClickEvent: GridEventListener<'rowClick'>
}

const default_columns = [
    {
        field: 'patient_flag',
        headerName: 'Flag',        
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
    },
    {
        field: 'initial_assessment',
        headerName: 'I/A',
        description: 'Date of the most recent initial assessment.',
        type: 'date',                
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
        valueGetter: (params) => {
            return params.row.treatment_logs.length
        }
    },
    {
        field: 'payer',
        headerName: 'Payer',
        type: 'string',        
    },
    {
        field: 'weeks_since_initial_assessment',
        headerName: 'Weeks Since I/A',
        type: 'number',                
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
        valueGetter: (params) => {
            let total = 0
            if(params.row.treatment_logs && params.row.treatment_logs.length > 0) {
                params.row.treatment_logs.map((treatment_log: TreatmentLog) => {
                    total += treatment_log.minutes!
                })                    
            }                
            return total
        }
    },
] as GridColDef[]

const columnGroupingModel: GridColumnGroupingModel = [
    {
        groupId: 'Contact',
        children: [
            { field: 'contact_i_a' }, { field: 'contact_f_u'}
        ],
    },
];

export const RegistryDataGrid:React.FC<RegistryDataGridProps> = ({patients, questionnaires, handlePatientClickEvent}) => {

    const [columns, setColumns] = React.useState<GridColDef[]>([])    

    const akello = useAkello()
    const selectedPatient = akello.getSelectedPatientRegistry()

    React.useEffect(() => {
        let new_columns = [] as GridColDef[]    
        questionnaires.map((questionnaire) => {            
            const first_column = {
                "field": questionnaire.uid + '_first',
                "headerName": questionnaire.name + ' Initial',
                "description": "Initial baseline " + questionnaire.uid + " screening",
                "type": "number",
                "width": 110,
                "editable": true,
                valueGetter: (params: GridValueGetterParams<any, any>) => {                 
                    if (params.row.treatment_logs.length > 0) {                                                                           
                        let element = params.row.treatment_logs[0].scores.find((element: any) => element.score_name == questionnaire.name)
                        if(element) {
                            return element.score_value
                        }                        
                    }
                    return 'N/A'
                }
            }
            const last_column = {
                "field": questionnaire.uid + '_last',
                "headerName": questionnaire.name + ' Last',
                "description": "Most recent " + questionnaire.uid + " screening",
                "type": "number",
                "width": 110,
                "editable": true,
                valueGetter: (params: GridValueGetterParams<any, any>) => {
                    if (params.row.treatment_logs.length > 0) {                        
                        let element = params.row.treatment_logs[params.row.treatment_logs.length - 1].scores.find((element: any) => element.score_name == questionnaire.name)
                        if(element) {
                            return element.score_value
                        }
                    }
                    return 'N/A'
                }
            }

            const delta_column = {
                "field": questionnaire.uid + '_delta',
                "headerName": questionnaire.name + ' Delta',
                "description": "Delta for " + questionnaire.uid + " between initial and last",
                "type": "number",
                "width": 110,
                "editable": true,
                valueGetter: (params: GridValueGetterParams<any, any>) => {
                    if (params.row.treatment_logs.length > 0) {                        
                        let first_element = params.row.treatment_logs[0].scores.find((element: any) => element.score_name == questionnaire.name)
                        let last_element = params.row.treatment_logs[params.row.treatment_logs.length - 1].scores.find((element: any) => element.score_name == questionnaire.name)
                        if(first_element && last_element) {
                            let diff = last_element.score_value - first_element.score_value
                            return diff / first_element.score_value * 100
                        }
                    }
                    return 'N/A'
                }
            }
            new_columns.push(first_column)
            new_columns.push(last_column)     
            new_columns.push(delta_column)                           
        })
        setColumns([...default_columns, ...new_columns]);
        
    }, [patients])   
    
    
    const darkTheme = createTheme({
        typography: {
            fontFamily: [
              'Work Sans',
            ].join(','),
          },
        palette: {
          mode: 'dark',
        },
      });
      
    const lightTheme = createTheme({
        typography: {
            fontFamily: [
              'Work Sans',
            ].join(','),
          },
      palette: {
        mode: 'light'
      }
    })

    let muiTheme = lightTheme

    const theme = document.querySelector('html')?.getAttribute('data-mantine-color-scheme');
    if(theme == 'dark') {
        muiTheme = darkTheme
    }
    

    return (
        <>
            <ThemeProvider theme={muiTheme}>
                <DataGrid                                
                    onRowClick={handlePatientClickEvent}
                    rows={patients}
                    getRowId={(row) => row.patient_mrn}
                    columns={columns}
                    experimentalFeatures={{ columnGrouping: true }}
                    columnGroupingModel={columnGroupingModel}
                    rowSelectionModel={selectedPatient?.patient_mrn}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </ThemeProvider>
        </>
    )
}

