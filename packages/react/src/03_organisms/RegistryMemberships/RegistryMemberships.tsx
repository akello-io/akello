import React, {ReactNode} from 'react';
import classNames from "classnames";

export interface RegistryMembershipsProps {
    children: ReactNode
}


const RegistryMemberships = (props: RegistryMembershipsProps) => {

    return (
        <div className={"w-full h-auto "}>
            <div className={"rounded-t-xl flex justify-between bg-ak-light-blue w-full px-12 py-4 text-white"}>

                <div className={"flex flex-row space-x-4 text-2xl my-auto"}>
                    <div>
                        Registries you are part of
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-1 divide-y rounded-b-xl "}>
                {props.children}
            </div>
        </div>

    )
};

export default RegistryMemberships;
