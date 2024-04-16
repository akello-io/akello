import React, { useState, useEffect } from 'react'
import {RegistryTreatment, Questionnaire} from "@akello/core";
import { em, LoadingOverlay, Box } from '@mantine/core';
import {useAkello, useSelectedRegistry} from "@akello/react-hook"
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {RegistryDataGrid} from "../../../organisms/medical/registry-data-grid";


export interface RegistryPageProps {
    drawerHandlers: any,
    onNavigate: (path: string) => void,
    patient_id?: string
}

export const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers, onNavigate, patient_id}) => {
    const [patients, setPatients] = useState<RegistryTreatment[]>([])
    const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
    const akello = useAkello()
    const selectedRegistry = useSelectedRegistry()
    const isMobile = useMediaQuery(`(max-width: ${em(880)})`);
    const [visible, { open, close }] = useDisclosure(false);

    useEffect(() => {
        drawerHandlers.open()
    })

    console.log('loading registry page >>>>>>>>>>>>>>>>>>>>>>>>>>  ')

    useEffect(() => {
        if (selectedRegistry) {
            const registryId = selectedRegistry.id;
            if (registryId) {
                open()
                akello.registryService.getRegistryPatients(registryId, (data) => {
                    close()
                    const successfully_loaded = data['successfully_loaded'].filter((patient: RegistryTreatment) => patient.status !== 'Deactivated')
                    setPatients(successfully_loaded)
                    setQuestionnaires(data['questionnaires'].filter((questionnaire: Questionnaire) => questionnaire.active === true))
                    if(successfully_loaded.length == 0) {
                        onNavigate('/first-patient')
                    } else {
                        successfully_loaded.forEach((patient: RegistryTreatment) => {
                            if(patient.mrn == patient_id) {
                                akello.selectPatient(patient)
                                akello.dispatchEvent({ type: 'change' });
                            }
                        })
                    }
                }, (data: any) => {
                    console.log(data)
                    close()
                })
            }
        }
    }, [akello, selectedRegistry])

    const handlePatientClickEvent = (object: any) => {
        const clickedPatient = object.row as RegistryTreatment
        akello.selectPatient(clickedPatient)
        akello.dispatchEvent({ type: 'change' });
        if(isMobile) {
            onNavigate('/patient/'+clickedPatient.mrn)
        } else {
            onNavigate('/registry/'+clickedPatient.mrn)
        }
    }

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <RegistryDataGrid patients={patients} questionnaires={Object.assign([], questionnaires)} handlePatientClickEvent={handlePatientClickEvent}/>
            </Box>
        </>
    )
}
