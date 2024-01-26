import * as React from 'react';
import {
    GridEventListener
} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {PatientRegistry, Questionnaire} from "@akello/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {getRegistryPatients} from "../../api/registry";
import AppContainer from "../../stories/app/Container/AppContainer";
import PatientDrawer from "./components/patient-drawer/patient-view-drawer/PatientDrawer";
import AddPatientDrawer from "./components/patient-drawer/refer-patient-drawer/AddPatientDrawer";
import { RegistryDataGrid } from "@akello/react";
import {Auth} from "aws-amplify";

export default function DataGridDemo() {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [role, setRole] = useState('')
    const [addPatient, setAddPatient] = useState(false)
    const [patients, setPatients] = useState<PatientRegistry[]>([])
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPatient, setSelectedPatient] = useState<PatientRegistry>()
    const navigate = useNavigate()
    const token = useSelector ((state: RootState) => state.app.token)
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)


    useEffect(() => {
        if(token && selectedRegistry.id) {
            setIsLoading(true)
            getRegistryPatients(selectedRegistry.id, token, (data) => {                
                setPatients(data['successfully_loaded'])
                setIsAdmin(data['is_admin'])
                setQuestionnaires(data['questionnaires'])
                setRole(data['role'])
                setIsLoading(false)
            }, (data) => {
                Auth.signOut()
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
            })
        }
    }, [token, selectedRegistry])

    const handlePatientClickEvent: GridEventListener<'rowClick'> = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        navigate('/registry?mrn='+ params.row.patient_mrn)
        let selectedPatientIdx = patients.findIndex((patient: any) => patient.patient_mrn == params.row.patient_mrn)
        setSelectedPatient(patients[selectedPatientIdx])
        setChecked(true)
    };

    
    return (
        <AppContainer isLoading={isLoading} title={selectedRegistry.name} is_admin={isAdmin} role={role} headerButtons={[
            (
                <>
                    {!isLoading && (
                        <button
                            type="button"
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick={() => {
                                setAddPatient(true)
                            }}
                        >
                            Enroll a Patient
                        </button>
                    )}
                </>
            ),
        ]}>
            <div className={"bg-white"}>
                {!isLoading && (
                    <>
                        <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={handlePatientClickEvent} />
                        <PatientDrawer checked={checked} setChecked={setChecked} questionnaires={Object.assign([], questionnaires)} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />
                        <AddPatientDrawer checked={addPatient} setChecked={setAddPatient} patients={patients} setPatients={setPatients} />
                    </>
                )}
            </div>
        </AppContainer>
    );
}