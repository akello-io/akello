import React from 'react'
import { PatientStatusSelector } from '../../../molecules/medical/patient-status-selector'
import { useAkello } from '@akello/react-hook'
import { RegistryTreatment } from '@akello/core'
import { IconPhone } from "@tabler/icons-react";

import {Select, Container, Button, ThemeIcon, SegmentedControl, Anchor} from '@mantine/core';



export const PatientDetail = () => {
    const akello = useAkello()
    const selectedPatient = akello.getSelectedPatientRegistry()!
    const registry_id = akello.getSelectedRegistry()!.id


    return (
        <div>
            <div className={"flex flex-row justify-between border-b border-1 px-3 py-2"}>
                <div className='flex flex-col'>
                    <div className={"text-xl font-semibold"}>
                        {selectedPatient.first_name} {selectedPatient.last_name}
                    </div>
                    <Anchor size="md" href={"mailto:" + selectedPatient.email} target="_blank">
                        {selectedPatient.email}
                    </Anchor>
                    <div className={"text-sm"}>
                        Referring NPI: {selectedPatient.referring_npi}
                    </div>
                </div>
                <div className='flex flex-row space-x-3'>
                    <ThemeIcon>
                        <IconPhone style={{  width: '70%', height: '70%' }} />
                    </ThemeIcon>
                    <a className={'text-md'} href={'tel:' + selectedPatient.phone_number}>{selectedPatient.phone_number}</a>
                </div>
            </div>
            <PatientStatusSelector registry_id={registry_id} selectedPatient={selectedPatient} />
            <Container >
                    <Button color={'red'} fullWidth onClick={() =>{}}>
                        Start Session
                    </Button>
                </Container>
        </div>
    )
}


