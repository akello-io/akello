import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useAkello } from '@akello/react-hook';

interface PatientRegistryGridProps {
    rows: [],
    measurements: any[]
}

const columns = [
    {
        field: 'user_id',
        headerName: 'ID',
        width: 90,
    },
    {
        field: 'flag',
        headerName: 'Flag',
        width: 90,
    },
    {
        field: 'mrn',
        headerName: 'MRN',
        width: 90,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 90,
    },
    {
        field: 'referring_npi',
        headerName: 'Referring NPI',
        width: 90,
    },
    {
        field: 'payer',
        headerName: 'Payer',
        width: 90,
    },
    {
        field: 'first_name',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'last_name',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'phone_number',
        headerName: 'Phone Number',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
    },
    {
        field: 'date_of_birth',
        headerName: 'DOB',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'initial_assessment',
        headerName: 'I/A',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'last_follow_up',
        headerName: 'L/FU',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'last_psychiatric_consult',
        headerName: 'L/PC',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'relapse_prevention_plan',
        headerName: 'RPP',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'total_sessions',
        headerName: '# Sessions',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'weeks_since_initial_assessment',
        headerName: 'Weeks Since I/A',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'minutes_this_month',
        headerName: 'Minutes This Month',
        type: 'number',
        width: 110,
        editable: true,
    },
]

export const PatientRegistryGrid:React.FC<PatientRegistryGridProps> = ({rows, measurements}) => {
    const akello = useAkello();

    const columns_data: GridColDef<any>[] = columns;

    for(let i = 0; i < measurements.length; i++) {
        columns_data.push({
            field: measurements[i].field + '_initial',
            headerName: measurements[i].headerName + ' Initial',
            width: 110,
            editable: true,
        })
        columns_data.push({
            field: measurements[i].field + '_last',
            headerName: measurements[i].headerName + ' Last',
            width: 110,
            editable: true,
        })
    }


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns_data}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            user_id: false
                        }
                    },
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                }}
                onRowClick={(event) => {
                    akello.selectPatient(event.row)
                }}
                slots={{ toolbar: GridToolbar }}
                getRowId={(row) => row.user_id}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
