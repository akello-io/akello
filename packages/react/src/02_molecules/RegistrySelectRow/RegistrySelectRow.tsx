import React from 'react';

export interface RegistrySelectRowProps {
    logo: string
    name: string
    members: number
    patients: number
    onClick: (registry_id: string) => void
}

const RegistrySelectRow = (props: RegistrySelectRowProps) => {

    return (
        <>
            <div className={"flex flex-row w-full justify-between bg-base-100 py-8 px-12"}
                 onClick={() => {props.onClick('registry-id')}}
                 onFocus={() => {}}
            >
                <div className={" flex flex-row space-x-4"}>
                    <div>
                        <img src={props.logo} className={"w-28 h-auto rounded-lg cursor-pointer"}/>
                    </div>

                    <div className={"flex flex-col space-y-4 text-base-content"}>
                        <div className={"font-medium text-3xl"}>
                            {props.name}
                        </div>
                        <div>
                            {props.members} members | {props.patients} active patients
                        </div>
                    </div>

                </div>
                <div className={"my-auto"}>
                    <button className={"btn btn-warning"}>
                        LAUNCH
                    </button>
                </div>
            </div>
        </>
    )
};

export default RegistrySelectRow;
