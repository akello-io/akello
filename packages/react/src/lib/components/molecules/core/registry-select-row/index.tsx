import React from 'react';

export interface RegistrySelectRowProps {
    id: string
    name: string
    members: number
    logo_url: string
    patients: number
    screeners: number    
    onClick: () => void
}

export const RegistrySelectRow = (props: RegistrySelectRowProps) => {

    return (
        <div className={"flex shadow-md flex-row w-full justify-between py-8 px-12"} onClick={props.onClick}>                
            {/* */}
            <div className={" flex flex-row space-x-4"}>
                <div>
                    <img src={props.logo_url} className={"w-28 h-auto rounded-lg cursor-pointer"}/>
                </div>
                <div className={"flex flex-col space-y-4"}>
                    <div className={"font-medium text-3xl"}>
                        {props.name}
                    </div>
                    <div className="flex flex-row">
                        {props.members} members | {props.patients} active patients | {props.screeners} screeners
                    </div>
                    <div>

                    </div>
                </div>

            </div>

            <div className={"my-auto"}>
                <button className={"btn btn-secondary rounded-lg text-xl"}>
                    LAUNCH
                </button>

            </div>

        </div>
    )    
};

