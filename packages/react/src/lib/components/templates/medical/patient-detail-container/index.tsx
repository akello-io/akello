import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch } from '@mantine/core';
import { SessionBtn } from "../../../atoms/medical/session-btn";
import { PatientInfoCard } from "../../../atoms/medical/patient-info-card";
import { RegistryTreatment } from "@akello/core";


export interface PatientDetailContainerProps {
    selectedPatient: RegistryTreatment
}

export const PatientDetailContainer: React.FC<PatientDetailContainerProps> = ({selectedPatient}) => {

    return (
        <div>
            <PatientInfoCard selectedPatient={selectedPatient}/>
            <SessionBtn/>

        </div>
    )
}
