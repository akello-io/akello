import React, { useEffect, useState } from 'react'
import { Box } from '@mantine/core';
import { PatientRegistryGrid } from '../../../organisms/medical/patient-registry-grid'
import { useAkello } from '@akello/react-hook';

export interface RegistryPageProps {
    drawerHandlers: any,
    onNavigate: (path: string) => void
}

export const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers, onNavigate}) => {


    const akello = useAkello();
    const [patients, setPatients] = useState<any>([])

    useEffect(() => {
        akello.registryService.getPatients(akello.getSelectedRegistry()!.id, (data) => {
            setPatients(data)
        })
    },[])

    return (
        <>
            <Box pos="relative">
                <PatientRegistryGrid
                    rows={patients}
                    measurements={[]}
                    onPatientSelect={(row) => {
                        akello.selectPatient(row)
                        akello.dispatchEvent({ type: 'change' });
                    }}
                />
            </Box>
        </>
    )
}
