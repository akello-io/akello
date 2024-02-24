import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {PatientRegistry, TreatmentLogScore, Questionnaire} from "@akello/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';



export interface PatientTreatmentHistoryProps {
    selectedPatient: PatientRegistry,
    questionnaires: Questionnaire[]
}

export const PatientTreatmentHistoryDataGrid:React.FC<PatientTreatmentHistoryProps> = ({ selectedPatient, questionnaires }) => {


    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Date',
            width: 160,            
            valueGetter: (params) => {
                if(params.row.date) {
                    return new Date(params.row.date).toLocaleDateString()
                }
            }
        },
        {
            field: 'contact_type',
            headerName: 'Contact Type',
            width: 150,
        },
        {
            field: 'weeks_in_treatment',
            headerName: 'Weeks',
            type: 'number',
            width: 60,
        },
        {
            field: 'visit_type',
            headerName: 'Visit Type',
            width: 160,
        },
        {
            field: 'minutes',
            headerName: 'Minutes',
            width: 160,
            valueFormatter: ({ value }) => value.toFixed(2)
        },
        {
            field: 'no_show',
            headerName: 'No Show',
            width: 160,
        },
    ];

    let score_names = questionnaires.map((questionnaire) => { return questionnaire.name})

    if(!selectedPatient.treatment_logs) {
        return (
            <></>
        )
    }

    // Use the first row to determine the data columns.
    // TODO: Consider using the configuration passed into the registry
    if(selectedPatient.treatment_logs.length > 0) {
        score_names.map((score_name) => {
            const score_filed:GridColDef ={
                field: score_name,
                headerName: score_name,
                valueGetter:(params)=>{
                    const element = params.row.scores.find((element: TreatmentLogScore) => element.score_name == score_name)
                    if(element) {
                        return element.score_value;
                    } else {
                        return 0
                    }
                },
                width: 160,
            }
            columns.push(score_filed)
        })
    }

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
        <ThemeProvider theme={muiTheme}>            
            <Box sx={{ height: 400, width: '100%' }}>            
                <DataGrid
                    rows={selectedPatient.treatment_logs}
                    columns={columns}
                    getRowId={(row) => row.date + '-' + row.weeks_in_treatment + '-' + row.visit_type}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
        </ThemeProvider>
    );
}
