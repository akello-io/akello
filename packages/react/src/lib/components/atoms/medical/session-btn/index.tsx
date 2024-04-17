import React, { useEffect } from "react"
import { PatientSession } from "../../../organisms/medical"
import { PatientDetail } from "../../../organisms/medical/patient-detail"
import { Switch } from '@mantine/core';
import { SessionTimer  } from "../session-timer";
import { notifications } from '@mantine/notifications';


export interface SessionBtnProps {
}

export const SessionBtn : React.FC<SessionBtnProps> = () => {

    const [totalSeconds, setTotalSeconds] = React.useState<number>(0)

    const sessionTimerLabel = (<span className='text-xl'><SessionTimer onUpdate={(
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
    }}/></span>)

    const startSessionLabel = (<span className='text-xl font-semibold'></span>)

    const [session, setSession] = React.useState(true)
    const [switchLabel, setSwitchLabel] = React.useState<any>(sessionTimerLabel)

    useEffect(() => {
        if(session){
            setSwitchLabel(sessionTimerLabel)
        }else{
            setSwitchLabel(startSessionLabel)
        }
    }, [session])


    return (
        <div className='flex flex-row'>
                <Switch
                    size="xl"
                    checked={session}
                    onChange={() => setSession(!session)}
                    color="green"
                    label={switchLabel}
                />

        </div>
    )
}
