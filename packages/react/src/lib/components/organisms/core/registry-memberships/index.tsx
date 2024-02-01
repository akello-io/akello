import React, {ReactNode, Children} from 'react';
import classNames from "classnames";
import {RegistryCreateRow} from "../../../molecules/core/registry-create-row";

export interface RegistryMembershipsProps {
    children: ReactNode
    onCreate: () => void
}


export const RegistryMemberships = (props: RegistryMembershipsProps) => {
    const count = Children.count(props.children);
    return (
        <div className={"w-full h-auto "}>
            <div className={"rounded-t-xl flex justify-between bg-ak-light-blue w-full px-12 py-4 text-white"}>
                <div className={"flex flex-row space-x-4 text-2xl my-auto"}>
                    {count > 0 && (<div>Registries you are part of</div>)}
                    {count == 0 && (<div>Create a new registry</div>)}
                </div>
            </div>
            <div className={"grid grid-cols-1 divide-y rounded-b-xl "}>
                {count > 0 && (<div>{props.children}</div>)}
                {count == 0 && (<RegistryCreateRow onClick={props.onCreate}/>)}
            </div>
        </div>

    )
};
