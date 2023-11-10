import * as React from 'react';
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';

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
        field: 'phq9_first',
        headerName: 'First',
        description: 'First baseline PHQ9 screening',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'phq9_last',
        headerName: 'Last',
        description: 'Most recent PHQ9 screening',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'phq9_last_date',
        headerName: 'Last Date',
        description: 'Date of most recent PHQ9 screening',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.phq9_last_date) {
                return new Date(params.row.phq9_last_date * 1000)
            }
        }
    },
    {
        field: 'gad7_first',
        headerName: 'First',
        description: 'First baseline GAD7 screening.',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'gad7_last',
        headerName: 'Last',
        description: 'Most recent GAD7 screening.',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'gad7_last_date',
        headerName: 'Last Date',
        description: 'Date of last GAD7 screening.',
        type: 'date',
        width: 110,
        editable: true,
        valueGetter: (params) => {
            if(params.row.gad7_last_date) {
                return new Date(params.row.gad7_last_date * 1000)
            }
        }
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
    return (
        <div className={"w-full"}>
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
        </div>
    );
}


export default BillingReportDataGrid