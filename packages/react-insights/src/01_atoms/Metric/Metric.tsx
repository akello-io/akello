import React from 'react';

export interface MetricProps {
    value: string
    description: string
}

const Metric:React.FC<MetricProps> = (props: MetricProps) => {

    return (
        <>
            <div className={"text-center space-y-4"}>
                <div className={"font-black text-5xl"}>{props.value}</div>
                <div>{props.description}</div>
            </div>
        </>
    )
};

export default Metric;
