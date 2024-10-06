import * as React from 'react';
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const columns: GridColDef[] = [
    {
        field: 'stat_date',
        headerName: 'Date',
        width: 110,
        valueGetter: (stat_date: number) => {
            return new Date(stat_date).toLocaleDateString()
        }
    },
    {
        field: 'initial_assessment',
        headerName: 'Initial Assessment',
        width: 150,
        valueGetter: (initial_assessment: number) => {
            return new Date(initial_assessment).toLocaleDateString()
        }
    },
    {
        field: 'mrn',
        headerName: 'MRN',
        width: 150,
    },
    {
        field: 'first_name',
        headerName: 'First name',
        width: 100,
    },
    {
        field: 'last_name',
        headerName: 'Last name',
        width: 100,
    },
    {
        field: 'total_minutes',
        headerName: 'Minutes',
        type: "number"
    },
    {
        field: 'payer',
        headerName: 'Payer',

    },
    {
        field: '99492',
        headerName: '99492'

    },
    {
        field: '99493',
        headerName: '99493'
    },
    {
        field: '99494',
        headerName: '99494'
    },
    {
        field: 'referring_npi',
        headerName: 'Referring Provider NPI',
        width: 200
    },
    {
        field: 'cp_npi_visits',
        headerName: 'Problems List',
        width: 200,
        valueGetter: (value: any, row: any) => {
            if(row.cp_npi_visits.length == 0)      {
                return ''
            }
            return row.cp_npi_visits.map((item: any) => 'npi: ' + item.cp_npi + '; codes: ' + item.problems).join(' || ')
        }
    }
];


interface BillingReportDataGridProps {
    data: any[]
}


export const BillingReportDataGrid:React.FC<BillingReportDataGridProps> = ({data}) => {
    const darkTheme = createTheme({
        typography: {
            fontFamily: [

            ].join(','),
          },
        palette: {
          mode: 'dark',
        },
      });

    const lightTheme = createTheme({
        typography: {
            fontFamily: [

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
        <div className={"w-full"}>
            <ThemeProvider theme={muiTheme}>
                <DataGrid
                    getRowId={(row: any) => row.mrn + row.stat_date}
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 100,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar }}
                />
            </ThemeProvider>

        </div>
    );
}

