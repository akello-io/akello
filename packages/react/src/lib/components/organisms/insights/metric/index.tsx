import React from 'react';

export interface MetricProps {
    value: string
    description: string
}

export const Metric = (props: MetricProps) => {

    return (
        <>
            <div className={"text-center space-y-4"}>
                <div className={"text-base-content text-5xl"}>{props.value}</div>
                <div className={"text-base-content"}>{props.description}</div>
            </div>
        </>
    )
};
