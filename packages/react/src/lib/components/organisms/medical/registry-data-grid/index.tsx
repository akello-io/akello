import {DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar} from "@mui/x-data-grid";
import moment from "moment";
import {RegistryTreatment, Questionnaire, TreatmentLog} from "@akello/core";
import * as React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAkello } from "@akello/react-hook";

export interface RegistryDataGridProps {
    patients: RegistryTreatment[]
    questionnaires: Questionnaire[]
    handlePatientClickEvent: GridEventListener<'rowClick'>
}

const default_columns = [
    {
        field: 'patient_flag',
        headerName: 'Flag',
    },
    {
        field: 'mrn',
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
        valueGetter: (initial_assessment: number) => {
            return new Date(initial_assessment)
        }
    },
    {
        field: 'last_follow_up',
        headerName: 'F/U',
        description: 'Date of the most recent Follow Up, excluding those marked as no patient contact.',
        type: 'date',
        valueGetter: (last_follow_up: number) => {
            return new Date(last_follow_up)
        }
    },
    {
        field: 'last_psychiatric_consult',
        headerName: 'P/C',
        description: 'Date of most recent Psychiatric Consultation',
        type: 'date',
        valueGetter: (last_psychiatric_consult: number) => {
            return new Date(last_psychiatric_consult)
        }
    },
    {
        field: 'relapse_prevention_plan',
        headerName: 'R/P',
        description: 'Date of most recent Relapse Prevention Plan.',
        type: 'date',
        valueGetter: (relapse_prevention_plan: number) => {
            return new Date(relapse_prevention_plan)
        }
    },
    {
        field: 'total_sessions',
        headerName: '# Session',
        type: 'string',
        valueGetter: (total_sessions: any) => {
            return total_sessions.length
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
        valueGetter: (initial_assessment: number) => {
            var ia = moment(initial_assessment);
            var today = moment();
            var diff = moment.duration(today.diff(ia));
            return diff.years() * 52 + diff.weeks()
        }
    },
    {
        field: 'minutes_this_month',
        headerName: 'Minutes this month',
        description: 'The sum of all minutes recorded for the patient during the current calendar month.',
        type: 'number',
        valueGetter: (value: any, row: any) => {
            let total = 0
            if(row.treatment_logs && row.treatment_logs.length > 0) {
                row.treatment_logs.map((treatment_log: TreatmentLog) => {
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
        let new_columns = [] as any[]
        questionnaires.map((questionnaire) => {
            const first_column = {
                "field": questionnaire.uid + '_first',
                "headerName": questionnaire.name + ' Initial',
                "description": "Initial baseline " + questionnaire.uid + " screening",
                "type": "number",
                "width": 110,
                "editable": true,
                valueGetter: (value: any, row: any) => {
                    if (row.treatment_logs.length > 0) {
                        let element = row.treatment_logs[0].scores.find((element: any) => element.score_name == questionnaire.name)
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
                valueGetter: (value: any, row: any) => {
                    if (row.treatment_logs.length > 0) {
                        let element = row.treatment_logs[row.treatment_logs.length - 1].scores.find((element: any) => element.score_name == questionnaire.name)
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
                "description": "% Delta for " + questionnaire.uid + " between initial and last",
                "type": "number",
                "width": 110,
                "editable": true,
                valueGetter: (value: any, row: any) => {
                    if (row.treatment_logs.length > 0) {
                        let first_element = row.treatment_logs[0].scores.find((element: any) => element.score_name == questionnaire.name)
                        let last_element = row.treatment_logs[row.treatment_logs.length - 1].scores.find((element: any) => element.score_name == questionnaire.name)
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
              // 'Work Sans',
            ].join(','),
          },
        palette: {
          mode: 'dark',
        },
      });

    const lightTheme = createTheme({
        typography: {
            fontFamily: [
              //'Work Sans',
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
                    getRowId={(row: any) => row.mrn}
                    columns={columns}
                    columnGroupingModel={columnGroupingModel}
                    rowSelectionModel={selectedPatient?.mrn}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            </ThemeProvider>
        </>
    )
}

