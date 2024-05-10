import React, { useEffect, useState } from 'react'
import { Box } from '@mantine/core';
import { MetriportPatientRegistryGrid } from '../../../organisms/medical/metriport-patient-registry-grid'
import { useAkello } from '@akello/react-hook';

export interface MetriportRegistryPageProps {
    drawerHandlers: any,
    onNavigate: (path: string) => void
}

export const MetriportRegistryPage:React.FC<MetriportRegistryPageProps> = ({drawerHandlers, onNavigate}) => {


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
                <MetriportPatientRegistryGrid
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
