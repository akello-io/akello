import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {PatientRegistry} from "../../../data/schemas/RegistryModel";

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 160,
        valueGetter: (params) => {
            if(params.row.date) {
                return new Date(params.row.date * 1000).toLocaleDateString()
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
        field: 'phq9_score',
        headerName: 'PHQ9',
        width: 60,
    },
    {
        field: 'gad7_score',
        headerName: 'GAD7',
        width: 60,
    },
    {
        field: 'minutes',
        headerName: 'Minutes',
        width: 160,
    },
    {
        field: 'no_show',
        headerName: 'No Show',
        width: 160,
    },
];


interface PatientTreatmentHistoryProps {
    selectedPatient: PatientRegistry
}
const PatientTreatmentHistoryDataGrid:React.FC<PatientTreatmentHistoryProps> = ({ selectedPatient }) => {

    if(!selectedPatient.treatment_logs) {
        return (
            <></>
        )
    }

    return (
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
    );
}

export default PatientTreatmentHistoryDataGrid