import * as React from "react";
import {ReactNode} from "react";


export interface DrawerLayoutProps  {
    id: string
    checked: boolean
    setChecked: (checked: boolean) => void
    children: ReactNode
}

export const DrawerLayout:React.FC<DrawerLayoutProps> = ({id, checked, setChecked, children}) => {
    return (
        <>
            <div className="drawer drawer-end">
                <input id={id} type="checkbox" className="drawer-toggle" checked={checked} onClick={() => {
                    setChecked(!checked)
                }}/>
                <div className="drawer-side">
                    <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="bg-base-100 max-w-screen-sm p-4 min-h-full bg-base-100 text-base-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
