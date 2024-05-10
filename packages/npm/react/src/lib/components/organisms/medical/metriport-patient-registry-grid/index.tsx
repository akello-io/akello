import * as React from 'react';
import Box from '@mui/material/Box';
import {GridApi, DataGrid, GridColDef, GridToolbar, GridSingleSelectColDef } from '@mui/x-data-grid';
import { useAkello } from '@akello/react-hook';
import { Measurement, MeasureTypes } from '@akello/core';

interface MetriportPatientRegistryGridProps {
    rows: [],
    measurements: any[]
    onPatientSelect: (row: any) => void
}



export const MetriportPatientRegistryGrid:React.FC<MetriportPatientRegistryGridProps> = ({rows, measurements, onPatientSelect}) => {
    const akello = useAkello();



    const columns = [
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
            width: 110,
            editable: true
        },
    ]


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
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
                    onPatientSelect(event.row)
                }}
                slots={{ toolbar: GridToolbar }}
                getRowId={(row: any) => row.user_id}
                rowSelectionModel={akello.getSelectedPatientRegistry()?.user_id}
                pageSizeOptions={[5]}
                checkboxSelection={false}
                disableRowSelectionOnClick
            />
        </Box>
    )
}
