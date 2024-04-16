import React from 'react'
import { Box } from '@mantine/core';


export interface RegistryPageProps {
    drawerHandlers: any,
    onNavigate: (path: string) => void,
    patient_id?: string
}

export const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers, onNavigate, patient_id}) => {

    return (
        <>
            <Box pos="relative">
                <div>registry grid</div>
            </Box>
        </>
    )
}
