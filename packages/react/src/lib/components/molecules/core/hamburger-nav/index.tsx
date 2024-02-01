import React, {ReactNode} from 'react';
import {HamburgerMenuButton}from "../../../atoms/core/hamburger-btn";

export interface HamburgerMenuProps {
    children: ReactNode
}

const HamburgerMenu = (props: HamburgerMenuProps) => {

    return (
        <>
            <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
            <HamburgerMenuButton htmlFor={"nav-drawer"} />
            <div className="drawer-side z-50">
                <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {
                        props.children
                    }
                </ul>
            </div>
        </>
    )
};

export default HamburgerMenu;
