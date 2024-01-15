import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {PatientRegistry, TreatmentLogScore} from "../../../data/schemas/RegistryModel";



interface PatientTreatmentHistoryProps {
    selectedPatient: PatientRegistry
}
const PatientTreatmentHistoryDataGrid:React.FC<PatientTreatmentHistoryProps> = ({ selectedPatient }) => {


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
        },
        {
            field: 'no_show',
            headerName: 'No Show',
            width: 160,
        },
    ];

    if(!selectedPatient.treatment_logs) {
        return (
            <></>
        )
    }

    // Use the first row to determine the data columns.
    // TODO: Consider using the configuration passed into the registry
    if(selectedPatient.treatment_logs.length > 0) {
        selectedPatient.treatment_logs[0].scores.map((score) => {
            const score_filed:GridColDef ={
                field: score.score_name,
                headerName: score.score_name,
                valueGetter:(params)=>{
                    const element = params.row.scores.find((element: TreatmentLogScore) => element.score_name == score.score_name)
                    if(element) {
                        return element.score_value;
                    }
                },
                width: 160,
            }
            columns.push(score_filed)
        })
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