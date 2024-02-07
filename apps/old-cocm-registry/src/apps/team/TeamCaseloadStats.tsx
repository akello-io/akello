import * as React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'care_manager', headerName: 'Name', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'caseload', headerName: 'Caseload', width: 90 },
    { field: 'pts_w_ia', headerName: 'pts_w_ia', width: 90 },
    { field: 'pts_w_fu', headerName: 'pts_w_fu', width: 90 },
    { field: 'avg_fu', headerName: 'avg_fu', width: 90 },
    { field: 'contacts_w_scale', headerName: 'contacts_w_scale', width: 90 },
    { field: 'avg_in_clinic', headerName: 'avg_in_clinic', width: 90 },
    { field: 'avg_by_phone', headerName: 'avg_by_phone', width: 90 },
    { field: 'num_in_rp', headerName: 'num_in_rp', width: 90 },
    { field: 'num_flagged', headerName: 'num_flagged', width: 90 },
    { field: 'num_w_pc', headerName: 'num_w_pc', width: 90 },
    { field: 'not_improv__wo_pc', headerName: 'not_improv__wo_pc', width: 90 },
    { field: 'avg_phq_first', headerName: 'avg_phq_first', width: 90 },
    { field: 'avg_phq_last', headerName: 'avg_phq_last', width: 90 },
    { field: 'avg_gad_first', headerName: 'avg_gad_first', width: 90 },
    { field: 'avg_gad_last', headerName: 'avg_gad_last', width: 90 },
    { field: 'no_response_phq', headerName: 'no_response_phq', width: 90 },
    { field: 'no_response_gad', headerName: 'no_response_gad', width: 90 },
    { field: 'no_remission_phq', headerName: 'no_remission_phq', width: 90 },
    { field: 'no_remission_gad', headerName: 'no_remission_gad', width: 90 },
];

const rows = [
    { id: 1, care_manager: 'Queenie Bechtelar', role: 'Care Manager',  caseload: 0, pts_w_ia: 0, pts_w_fu: 0, avg_fu: 0, contacts_w_scale: 0, avg_in_clinic: 0, avg_by_phone: 0, num_in_rp: 0, num_flagged: 0, num_w_pc: 0, not_improv__wo_pc: 0, avg_phq_first: 0, avg_phq_last: 0, avg_gad_first: 0, avg_gad_last: 0, no_response_phq: 0, no_response_gad: 0, no_remission_phq: 0, no_remission_gad: 0},
    { id: 2, care_manager: 'Kristina Rowe', role: 'Psychiatrist',  caseload: 0, pts_w_ia: 0, pts_w_fu: 0, avg_fu: 0, contacts_w_scale: 0, avg_in_clinic: 0, avg_by_phone: 0, num_in_rp: 0, num_flagged: 0, num_w_pc: 0, not_improv__wo_pc: 0, avg_phq_first: 0, avg_phq_last: 0, avg_gad_first: 0, avg_gad_last: 0, no_response_phq: 0, no_response_gad: 0, no_remission_phq: 0, no_remission_gad: 0},
    { id: 3, care_manager: 'Maia Stanton', role: 'Care Manager', caseload: 0, pts_w_ia: 0, pts_w_fu: 0, avg_fu: 0, contacts_w_scale: 0, avg_in_clinic: 0, avg_by_phone: 0, num_in_rp: 0, num_flagged: 0, num_w_pc: 0, not_improv__wo_pc: 0, avg_phq_first: 0, avg_phq_last: 0, avg_gad_first: 0, avg_gad_last: 0, no_response_phq: 0, no_response_gad: 0, no_remission_phq: 0, no_remission_gad: 0},
];



const TeamCaseloadStats = () => {
    return (
        <>
            <div className={"font-black py-4"}>
                Team Caseload Stats
            </div>
            <div className={"bg-white"}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        </>
    )
}

export default TeamCaseloadStats