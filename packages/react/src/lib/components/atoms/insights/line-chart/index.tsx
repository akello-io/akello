
import React from 'react'
import { LineChart as MUILineChart } from '@mui/x-charts/LineChart';

export interface LineChartProps {
    title: string
    xAxis: any
    data: any
}

export const LineChart:React.FC<LineChartProps> = ({
    title,
    xAxis,
    data
}) =>{
    return (
        <>
            <div className='w-full h-96'>
                {title && <h1>{title}</h1>}
                <MUILineChart
                    xAxis={[{ data: xAxis }]}
                    series={[
                        {
                        data: data,
                        },
                    ]}
                />
            </div>
        </>
    )
}