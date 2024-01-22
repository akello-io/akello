import React from 'react';
import classNames from "classnames";

export interface RegistryCreateRowProps {
    onClick: () => void
}

const RegistryCreateRow = (props: RegistryCreateRowProps) => {
    return (
        <>
            <div className={"flex flex-row w-full justify-between bg-base-100 py-8 px-12"} >
                <div className={" flex flex-row space-x-4"}>
                    <div>

                    </div>

                    <div className={"flex flex-col space-y-4 text-lg text-base-content max-w-lg"}>
                        Get started by setting up a new registry of your population. You can add your team members securely to each registry you create.
                    </div>

                </div>
                <div className={"my-auto"}>
                    <button className={"btn btn-warning"} onClick={props.onClick}>
                        CREATE
                    </button>
                </div>
            </div>
        </>
    )
};

export default RegistryCreateRow;
