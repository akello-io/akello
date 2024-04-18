import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch, Select } from '@mantine/core';
import { SessionTimer  } from "../session-timer";
import { notifications } from '@mantine/notifications';
import { useAkello } from "@akello/react-hook";


export interface SessionBtnProps {
    onReviewTypeSelect: (reviewType: string) => void;
}

export const SessionBtn : React.FC<SessionBtnProps> = ({onReviewTypeSelect}) => {

    const akello = useAkello();
    const [reviewType, setReviewType] = React.useState<string>('')

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

                    <Select
                            required
                            label="Review type"
                            description="Select the type of review you want to start"
                            defaultValue={'Caseload review'}
                            value={reviewType}
                            placeholder="Review type"
                            data={['Caseload review', 'Patient Session']}
                            onChange={(value: any) => {
                                onReviewTypeSelect(value!)
                                setReviewType(value!)
                            }}
                        />

            </div>
        </>
    )
}
