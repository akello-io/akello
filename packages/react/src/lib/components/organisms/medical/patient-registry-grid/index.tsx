import * as React from 'react';
import Box from '@mui/material/Box';
import {GridApi, DataGrid, GridColDef, GridToolbar, GridSingleSelectColDef } from '@mui/x-data-grid';
import { useAkello } from '@akello/react-hook';

interface PatientRegistryGridProps {
    rows: [],
    measurements: any[]
    onPatientSelect: (row: any) => void
}



export const PatientRegistryGrid:React.FC<PatientRegistryGridProps> = ({rows, measurements, onPatientSelect}) => {
    const akello = useAkello();

    const logtime = () => {
        const user_id = akello.getSelectedPatientRegistry()?.user_id
        const total_seconds = window.localStorage.getItem('totalSeconds')
        console.log('user_id ', user_id)
        console.log('total_seconds ', total_seconds)
    }

    const columns = [
        {
            field: 'user_id',
            headerName: 'ID',
            width: 90,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 150,
            renderCell: (params: any) => {
              const onStartClick = (e: any) => {
                logtime()

                e.stopPropagation(); // don't select this row after clicking
                console.log('params', params)
                console.log('e', e)
                onPatientSelect(params.row)

              };

              const onStopClick = (e: any) => {
                logtime()

                e.stopPropagation(); // don't select this row after clicking
                onPatientSelect(undefined)

              };

              if(akello.getSelectedPatientRegistry()?.user_id === params.row.user_id) {
                return (
                    <div className='btn btn-button bg-orange-300'
                        onClick={onStopClick}
                    >
                    Stop review
                    </div>
              )
              } else {
                return (
                    <div className='btn btn-ghost'
                        onClick={onStartClick}
                    >
                    Start review
                    </div>
              )
              }


            }
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
            width: 110,
            editable: true
        },
        {
            field: 'initial_assessment',
            headerName: 'I/A',
            width: 110,
            editable: true
        },
        {
            field: 'last_follow_up',
            headerName: 'L/FU',
            width: 110
        },
        {
            field: 'last_psychiatric_consult',
            headerName: 'L/PC',
            width: 110
        },
        {
            field: 'relapse_prevention_plan',
            headerName: 'RPP',
            width: 110
        },
        {
            field: 'total_sessions',
            headerName: '# Sessions',
            width: 110
        },
        {
            field: 'weeks_since_initial_assessment',
            headerName: 'Weeks Since I/A',
            width: 110,
            editable: true
        },
        {
            field: 'minutes_this_month',
            headerName: 'Minutes This Month',
            width: 110,
            editable: true
        },
    ]

    for(let i = 0; i < measurements.length; i++) {
        columns.push({
            field: measurements[i].field + '_initial',
            headerName: measurements[i].headerName + ' Initial',
            width: 110,
        })
        columns.push({
            field: measurements[i].field + '_last',
            headerName: measurements[i].headerName + ' Last',
            width: 110
        })
    }

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
