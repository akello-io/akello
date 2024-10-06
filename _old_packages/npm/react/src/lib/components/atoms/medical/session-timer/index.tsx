import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Text } from '@mantine/core';
import { useAkello } from '@akello/react-hook';


export interface SessionTimerProps {

  onUpdate: (
    totalSeconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    days: number,
    isRunning: boolean
  ) => void;


}

export const SessionTimer:React.FC<SessionTimerProps> = ({onUpdate}) => {

    const akello = useAkello();
    const [timingPatient, setTimingPatient] = React.useState(akello.getSelectedPatientRegistry())

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });


      useEffect(() => {
        onUpdate(
          totalSeconds,
          seconds,
          minutes,
          hours,
          days,
          isRunning
        )
      }, [seconds])


      useEffect(() => {
        reset()
      }, [akello.getSelectedPatientRegistry()!.user_id])


      return (
        <div style={{textAlign: 'center'}}>
          <div>
                <div className='font-bold text-6xl'>
                    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                </div>

            </div>
        </div>
      );
}

