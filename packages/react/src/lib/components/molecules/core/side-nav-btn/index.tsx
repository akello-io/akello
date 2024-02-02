import classNames from "classnames";
import React from 'react';
import {ReactNode} from "react";

export interface SideNavigationButtonProps {
    name: string
    short_name: string
    icon: ReactNode
    is_active: boolean
    navigate: () => void
}

export const SideNavigationButton:React.FC<SideNavigationButtonProps> = ({
    name, short_name, is_active, icon, navigate
}) => {
    let size = 'w-6 h-auto'
    return (
        <button className={
            classNames(
                "hover:bg-gray-800 hover:text-white p-2 cursor-pointer")
        } onClick={() => navigate()}>
            <button
                className={classNames(
                    is_active ? 'bg-gray-800 text-white' : 'text-gray-600',
                    'flex text-sm font-semibold mx-auto '
                )}
            >
                {icon}
                <span className="sr-only">{name}</span>
            </button>
            <p className={
                classNames(
                    {
                        "text-white" :is_active
                    },
                    "text-xs text-gray-600 text-center"
                )

            }>{short_name}</p>
        </button>
    )
}
