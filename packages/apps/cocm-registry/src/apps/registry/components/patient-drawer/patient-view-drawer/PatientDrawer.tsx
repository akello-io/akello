import * as React from "react";
import { ReactNode } from "react";
import {useEffect, useState} from "react";
import MainPatientTab from "./PatientTabs/MainPatientTab";
import StartSessionTab from "./PatientTabs/StartSessionTab";
import DrawerLayout from "../DrawerLayout";
import {PatientRegistry} from "../../../../../data/schemas/RegistryModel";

interface PatientDrawerProps {
    checked: boolean
    setChecked: (checked: boolean) => void
    selectedPatient?: PatientRegistry
    setSelectedPatient?: (patient: PatientRegistry) => void
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({checked, setChecked, selectedPatient, setSelectedPatient}) => {
    const [selectedTab, setSelectedTab] = useState('Main')
    const [selectedTabComponent, setSelectedTabComponent] = useState<ReactNode>()

    useEffect(() => {
        if(!checked) {
            // Reset the drawer view each time the drawer hides
            setSelectedTab('Main')
        }
    }, [checked])

    useEffect(() => {
        let mainTab = (<MainPatientTab setSelectedTab={setSelectedTab} selectedPatient={selectedPatient!} setSelectedPatient={setSelectedPatient!}/>)
        let sessionTab = (<StartSessionTab setSelectedTab={setSelectedTab} selectedPatient={selectedPatient!} setSelectedPatient={setSelectedPatient!}/>)
        if(selectedPatient) {
            if(selectedTab == 'Main') {
                setSelectedTabComponent(mainTab)
            }
            if(selectedTab == 'Session') {
                setSelectedTabComponent(sessionTab)
            }
        }
    }, [selectedTab, selectedPatient])

    return (
        <>
            <DrawerLayout id={'patient-drawer'} checked={checked} setChecked={setChecked}>
                { selectedTabComponent }
            </DrawerLayout>
        </>
    )
}

export default PatientDrawer