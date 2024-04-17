import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch, Select } from '@mantine/core';
import { SessionTimer  } from "../session-timer";
import { notifications } from '@mantine/notifications';
import { useAkello } from "@akello/react-hook";


export interface SessionBtnProps {
    onRunning: (isRunning: boolean) => void;
    onReviewTypeSelect: (reviewType: string) => void;
}

export const SessionBtn : React.FC<SessionBtnProps> = ({onRunning, onReviewTypeSelect}) => {

    const akello = useAkello();
    const [totalSeconds, setTotalSeconds] = React.useState<number>(0)
    const [reviewType, setReviewType] = React.useState<string>('')

    const startSessionLabel = (<span className='text-md font-semibold'>Start review</span>)
    const [session, setSession] = React.useState(false)
    const sessionTimerLabel = (
        <span>
            <SessionTimer
                    onRunning={(
                        isRunning: boolean
                    ) => {
                        onRunning(isRunning)
                    }}

                    onUpdate={(
                        totalSeconds: number,
                        seconds: number,
                        minutes: number,
                        hours: number,
                        days: number,
                        isRunning: boolean
                    ) => {
                        console.log('totalSeconds', totalSeconds)
                        console.log('seconds', seconds)
                        console.log('minutes', minutes)
                        console.log('hours', hours)
                        console.log('days', days)
                        console.log('isRunning', isRunning)
                        setTotalSeconds(totalSeconds)
                    }}/>
        </span>
    )
    const [switchLabel, setSwitchLabel] = React.useState<any>(sessionTimerLabel)

    useEffect(() => {
        setSession(false)
        setSwitchLabel(startSessionLabel)
    }, [akello.getSelectedPatientRegistry()])

    useEffect(() => {
        onRunning(session)
        if(session){
            setSwitchLabel(sessionTimerLabel)
        }else{
            setSwitchLabel(startSessionLabel)
        }
    }, [session])


    return (
        <div className='flex flex-row justify-between'>
                <Switch
                    checked={session}
                    onChange={() => setSession(!session)}
                    color="green"
                    size='md'
                    label={switchLabel}
                />
                {
                    session && (
                        <Select
                            defaultValue={'Caseload review'}
                            value={reviewType}
                            placeholder="Review type"
                            data={['Caseload review', 'Patient Session']}
                            onChange={(value) => {
                                onReviewTypeSelect(value!)
                                setReviewType(value!)
                            }}
                        />
                    )
                }

        </div>
    )
}
