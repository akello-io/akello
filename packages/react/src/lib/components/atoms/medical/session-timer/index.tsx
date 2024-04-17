import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Text } from '@mantine/core';


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

      return (
        <div style={{textAlign: 'center'}}>
          <div>
                <Text align="center" size='xl' fw={600}>
                    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                </Text>

            </div>
        </div>
      );
}

