import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch, Select } from '@mantine/core';
import { SessionTimer  } from "../session-timer";
import { notifications } from '@mantine/notifications';
import { useAkello } from "@akello/react-hook";
import { RadioGroup, Radio } from '@mantine/core';


export interface SessionBtnProps {
    onReviewTypeSelect: (reviewType: string) => void;
}

export const SessionBtn : React.FC<SessionBtnProps> = ({onReviewTypeSelect}) => {

    const akello = useAkello();
    const [reviewType, setReviewType] = React.useState<string>('Caseload review')

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
                        defaultValue={'Caseload review'}
                        value={reviewType}
                        onChange={(value: any) => {
                            onReviewTypeSelect(value!)
                            setReviewType(value!)
                        }}
                        required
                    >
                        <Radio value="Caseload review" label='Caseload review'/>
                        <Radio value="Patient Session" label='Patient Session'/>
                    </RadioGroup>

            </div>
        </>
    )
}
