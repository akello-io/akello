import * as React from 'react';
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const columns: GridColDef[] = [
    {
        field: 'first_name',
        headerName: 'First name',
        width: 150,
    },
    {
        field: 'last_name',
        headerName: 'Last name',
        width: 150,
    },    
    {
        field: 'stat_date',
        headerName: 'Date',
        width: 110,
    },
    {
        field: 'total_minutes',
        headerName: 'Minutes',
        width: 110,
        type: "number"
    },
];


interface BillingReportDataGridProps {
    data: any[]
}


const BillingReportDataGrid:React.FC<BillingReportDataGridProps> = ({data}) => {
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
        <div className={"w-full"}>
            <ThemeProvider theme={muiTheme}>
                <DataGrid
                    getRowId={(row) => row.mrn + row.stat_date}
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


export default BillingReportDataGrid