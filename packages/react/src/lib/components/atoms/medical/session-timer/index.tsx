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

  onRunning: (isRunning: boolean) => void;

}

export const SessionTimer:React.FC<SessionTimerProps> = ({onRunning, onUpdate}) => {

    const akello = useAkello();

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
        onRunning(isRunning)
      }, [isRunning])


      return (
        <div style={{textAlign: 'center'}}>
          <div>
                <Text size='md' fw={600}>
                    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                </Text>

            </div>
        </div>
      );
}

