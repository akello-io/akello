import React, {ReactNode, Children} from 'react';

export interface DashboardComponentProps {
    children: ReactNode
    title: string
}


const DashboardComponent = (props: DashboardComponentProps) => {
    return (
        <div className={"w-full border border-1 bg-white"}>
            <div className={"font-regular border-b border-1 p-2"}>
                <p className={"text-xl"}>
                    {props.title}
                </p>
            </div>
            {props.children}
        </div>

    )
};

export default DashboardComponent;
