import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {getMembers} from "../../api/registry";

const columns: GridColDef[] = [
    {
        field: 'email',
        headerName: 'email',
        width: 250,
        editable: true,
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
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
        field: 'role',
        headerName: 'Role',
        type: 'string',
        width: 210,
        editable: true,
    },
    {
        field: 'is_admin',
        headerName: 'Admin',
        type: 'boolean',
        width: 210,
        editable: true,
    },
    {
        field: '',
        renderCell: (cellValues) => {
            return (
                <>
                    {
                        !cellValues.row.is_user && (
                            <div className={"btn btn-error"}
                                 onClick={(event) => {

                                 }}
                            >
                                Delete
                            </div>
                        )
                    }
                </>

            );
        }
    },
];


const TeamTable = () => {
    const [checked, setChecked] = useState(false)
    const [teamMembers, setTeamMebmers] = useState([])
    const token = useSelector((state: RootState) => state.app.token)
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)


    useEffect(() => {
        getMembers(selectedRegistry.id, token, (data) => {
            setTeamMebmers(data)
        })
    }, [token])


    const handleEvent: GridEventListener<'rowClick'> = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        // setChecked(true)
    };

    return (
        <>
            <div className={"font-black py-4"}>
                CoCM Team
            </div>
            <div className={"bg-white"}>
                <DataGrid
                    getRowId={(row) => row.user_id}
                    onRowClick={handleEvent}
                    rows={teamMembers}
                    columns={columns}
                />
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={checked} onClick={() => setChecked(!checked)}/>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamTable