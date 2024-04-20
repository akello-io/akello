import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch } from '@mantine/core';
import { SessionBtn } from "../../../atoms/medical/session-btn";
import { PatientInfoCard } from "../../../atoms/medical/patient-info-card";
import { RegistryTreatment } from "@akello/core";
import { Tabs } from '@mantine/core';
import { PatientSessionStepper } from "../../../molecules";
import { PatientTimeLog } from "../../../organisms/medical";
import { MeasureTypes } from "@akello/core";

export interface PatientDetailContainerProps {
    selectedPatient: RegistryTreatment
}

export const PatientDetailContainer: React.FC<PatientDetailContainerProps> = ({selectedPatient}) => {

    const [sessionTimerStarted, setSessionTimerStarted] = React.useState<boolean>(false)
    const [measureType, setMeasureType] = React.useState<MeasureTypes>(MeasureTypes.patient_caseload_review_minutes)

    useEffect(() => {
        window.localStorage.setItem('measureType', measureType)
    }, [measureType])

    return (
        <div>

            <PatientInfoCard
                selectedPatient={selectedPatient}
                onReviewTypeSelect={(measureType: MeasureTypes) => {
                    setMeasureType(measureType)
                }}
            />

            {
                measureType === MeasureTypes.patient_caseload_review_minutes && (
                    <>
                        <Tabs defaultValue="progress">
                            <Tabs.List>
                                <Tabs.Tab value="progress">Progress</Tabs.Tab>
                                <Tabs.Tab value="treatment_history">Treatment History</Tabs.Tab>
                                <Tabs.Tab value="time_log">Timelog</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="progress">
                                Gallery tab content
                            </Tabs.Panel>

                            <Tabs.Panel value="treatment_history">
                                Messages tab content
                            </Tabs.Panel>

                            <Tabs.Panel value="time_log">
                                <PatientTimeLog />
                            </Tabs.Panel>
                        </Tabs>

                    </>
                )
            }

            {
                measureType === MeasureTypes.patient_session_minutes && (

                    <div className='px-4'>
                        <PatientSessionStepper />
                    </div>

                )
            }


        </div>
    )
}
