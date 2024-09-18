import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch, Select } from '@mantine/core';
import { SessionTimer  } from "../session-timer";
import { notifications } from '@mantine/notifications';
import { useAkello } from "@akello/react-hook";
import { RadioGroup, Radio } from '@mantine/core';
import { MeasureTypes } from '@akello/core';


export interface SessionBtnProps {
    onReviewTypeSelect: (reviewType: MeasureTypes) => void;
}

export const SessionBtn : React.FC<SessionBtnProps> = ({onReviewTypeSelect}) => {

    const akello = useAkello();
    const [reviewType, setReviewType] = React.useState<MeasureTypes>(MeasureTypes.patient_caseload_review_minutes)

    return (
        <>
            <div className='flex flex-row w-full justify-between'>
                    <SessionTimer
                        onUpdate={(
                            totalSeconds: number,
                            seconds: number,
                            minutes: number,
                            hours: number,
                            days: number,
                            isRunning: boolean
                        ) => {
                            window.localStorage.setItem('totalSeconds', totalSeconds.toString())
                    }}/>

                    <RadioGroup
                        size="md"
                        variant="vertical"
                        defaultValue={MeasureTypes.patient_caseload_review_minutes}
                        value={reviewType}
                        onChange={(value: string) => {
                            onReviewTypeSelect(value as MeasureTypes)
                            setReviewType(value as MeasureTypes)
                        }}
                        required
                    >
                        <Radio value={MeasureTypes.patient_caseload_review_minutes} label='Caseload review'/>
                        <Radio value={MeasureTypes.patient_session_minutes} label='Patient Session'/>
                        <Radio value={MeasureTypes.patient_assessment_session_minutes} label='Patient Assessment Session'/>
                    </RadioGroup>

            </div>
        </>
    )
}
