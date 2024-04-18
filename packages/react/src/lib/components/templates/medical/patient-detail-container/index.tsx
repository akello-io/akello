import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch } from '@mantine/core';
import { SessionBtn } from "../../../atoms/medical/session-btn";
import { PatientInfoCard } from "../../../atoms/medical/patient-info-card";
import { RegistryTreatment } from "@akello/core";
import { Tabs } from '@mantine/core';
import { PatientSessionStepper } from "../../../molecules";


export interface PatientDetailContainerProps {
    selectedPatient: RegistryTreatment
}

export const PatientDetailContainer: React.FC<PatientDetailContainerProps> = ({selectedPatient}) => {

    const [sessionTimerStarted, setSessionTimerStarted] = React.useState<boolean>(false)
    const [reviewType, setReviewType] = React.useState<string>('')
    // data={['Caseload review', 'Patient Session']}

    return (
        <div>

            <PatientInfoCard
                selectedPatient={selectedPatient}
                onReviewTypeSelect={(reviewType: string) => {
                    setReviewType(reviewType)
                }}
            />

            {
                reviewType === 'Caseload review' && (
                    <>
                        <Tabs defaultValue="first">
                            <Tabs.List>
                                <Tabs.Tab value="first">Progress</Tabs.Tab>
                                <Tabs.Tab value="third">Treatment History</Tabs.Tab>
                            </Tabs.List>
                        </Tabs>

                    </>
                )
            }

            {
                reviewType === 'Patient Session' && (

                    <div className='px-4'>
                        <PatientSessionStepper />
                    </div>

                )
            }


        </div>
    )
}
