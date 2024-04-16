import React from 'react'
import { Box } from '@mantine/core';
import { PatientRegistryGrid } from '../../../organisms/medical/patient-registry-grid'

export interface RegistryPageProps {
    drawerHandlers: any,
    onNavigate: (path: string) => void,
    patient_id?: string
}

export const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers, onNavigate, patient_id}) => {

    return (
        <>
            <Box pos="relative">
                <PatientRegistryGrid
                    rows={[]}
                    measurements={[]}
                    onPatientSelect={(row) => onNavigate(`/patient/${row.user_id}`)}
                />
            </Box>
        </>
    )
}
