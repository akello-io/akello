import React, { useState, useEffect } from 'react'

interface RegistryPageProps {
    drawerHandlers: any
}

const RegistryPage:React.FC<RegistryPageProps> = ({drawerHandlers}) => {
    drawerHandlers.open()
    return (
        <>
            Registry Page
        </>
    )
}

export default RegistryPage