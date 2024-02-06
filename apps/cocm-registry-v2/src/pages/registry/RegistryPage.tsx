import React, { useState, useEffect } from 'react'
import {PatientRegistry, Questionnaire} from "@akello/core";
import {RegistryDataGrid} from "@akello/react";
import {useAkello} from "@akello/react-hook"

interface RegistryPageProps {
    drawerHandlers: any
}

const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers}) => {
    const [patients, setPatients] = useState<PatientRegistry[]>([])
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])

    drawerHandlers.open()
    const akello = useAkello()

    useEffect(() => {
        akello.registryService.getRegistryPatients(akello.selectedRegistry, (data) => {
            setPatients(data['successfully_loaded'])
        }, (data) => {
            debugger;
        })
    }, [])


    return (
        <>
            <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={()=> {}} />
        </>
    )
}

export default RegistryPage