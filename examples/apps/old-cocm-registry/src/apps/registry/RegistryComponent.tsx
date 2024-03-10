import * as React from 'react';
import {
    GridEventListener
} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {PatientRegistry, Questionnaire} from "@akello/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
// import {getRegistryPatients} from "../../api/registry";
import AppContainer from "../../stories/app/Container/AppContainer";
import PatientDrawer from "./components/patient-drawer/patient-view-drawer/PatientDrawer";
import AddPatientDrawer from "./components/patient-drawer/refer-patient-drawer/AddPatientDrawer";
import { RegistryDataGrid } from "@akello/react";
import {Auth} from "aws-amplify";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAkello } from '@akello/react-hook';




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
    const akello = useAkello()
    const navigate = useNavigate()
    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)


    useEffect(() => {
        if(selectedRegistry.id) {
            setIsLoading(true)            
            akello.registryService.getRegistryPatients(selectedRegistry.id, (data) => {
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
    }, [selectedRegistry])

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


    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    const lightTheme = createTheme({
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
        <AppContainer isLoading={isLoading} title={selectedRegistry.name} is_admin={isAdmin} role={role} headerButtons={[
            (
                <>
                    {!isLoading && (
                        <button
                            type="button"
                            className="btn btn-primary"
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
            <div className={""}>
                {!isLoading && (
                    <>
                        <ThemeProvider theme={muiTheme}>
                            <CssBaseline />
                            <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={handlePatientClickEvent} />
                        </ThemeProvider>
                        <PatientDrawer checked={checked} setChecked={setChecked} questionnaires={Object.assign([], questionnaires)} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />
                        <AddPatientDrawer checked={addPatient} setChecked={setAddPatient} patients={patients} setPatients={setPatients} />
                    </>
                )}
            </div>
        </AppContainer>
    );
}