import React, {Component, useEffect, useState} from 'react';
import './StopWatch.css';

interface StopWatchProps {
    timeCallback?: (mm: number, ss: number, ms: number) => void
}

const StopWatch:React.FC<StopWatchProps> = ({timeCallback}) => {
    const [mm, setMM] = useState(0)
    const [ss, setSS] = useState(0)
    const [ms, setMS] = useState(0)

    useEffect(() => {
        let mm_ = 0
        let ms_ = 0
        let ss_ = 0
        let interval_id = setInterval(() => {
            ms_ ++
            if (ms_ >= 100) {
                ss_ = ss_ + 1
                ms_ = 0
            }
            if (ss_ >= 60) {
                mm_ = mm_ + 1
                ss_ = 0
            }

            setMM(mm_)
            setSS(ss_)
            setMS(ms_)

            if(timeCallback) {
                timeCallback(mm_, ss_, ms_)
            }
            // console.log('tick')
        }, 10)


    }, [])

    // 1 => 01
    const format = (num: number) => {
        return (num + '').length === 1 ? '0' + num : num + '';
    }

    return (
        <div className="stop-watch">
            <div>
                <span>{format(mm)}</span>:
                <span>{format(ss)}</span>:
                <span>{format(ms)}</span>
            </div>
        </div>
    );

}

export default StopWatch