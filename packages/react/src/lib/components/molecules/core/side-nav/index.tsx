import React, {ReactNode, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {SideNavigationButton, SideNavigationButtonProps} from '../side-nav-btn';
import {ArrowLeftIcon} from "@heroicons/react/20/solid";

export interface SideNavigationProps {
    logo: ReactNode
    top_navigation: SideNavigationButtonProps[]
    bottom_navigation: SideNavigationButtonProps[]
    selectedBtn: SideNavigationButtonProps
}

export const SideNavigation:React.FC<SideNavigationProps> = ({logo, top_navigation, bottom_navigation, selectedBtn}) => {
    const [topNavigation, setTopNavigation] = useState(top_navigation)
    const [bottomNavigation, setBottomNavigation] = useState(bottom_navigation)    

    const [drawerToggle, setDrawerToggle] = useState(false)

    useEffect(() => {
        if(!selectedBtn?.toggle_drawer) {
            setDrawerToggle(false)
        }
    }, [selectedBtn])

    return (
        <>
            <div>
                {/* Static sidebar for desktop */}

                <div className="drawer">
                    <input id="reports-drawer" type="checkbox" className="drawer-toggle" checked={drawerToggle} />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <div className="fixed inset-y-0 left-0 z-50 block w-20 overflow-y-auto bg-gray-900 pb-4">
                            <div className="flex h-16 shrink-0 items-center justify-center bg-ak-light-blue">
                                {logo}
                            </div>
                            <nav className="mt-4">
                                <ul role="list" className="flex flex-col space-y-3">
                                    {
                                        topNavigation.map((item: SideNavigationButtonProps) => {                                            
                                            return (
                                                <>
                                                    <SideNavigationButton name={item.name} short_name={item.short_name} icon={item.icon} is_active={item.short_name==selectedBtn?.short_name} navigate={()=> {                                                                                                                
                                                        if(item.toggle_drawer) {
                                                            setDrawerToggle(!drawerToggle)
                                                        }
                                                        item.navigate()
                                                    }} />
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </nav>
                            <div className={""}>
                                <nav className="absolute bottom-0 left-0 right-0">
                                    <ul role="list" className="">
                                        {
                                            bottomNavigation.map((item: SideNavigationButtonProps) => {
                                                return (
                                                    <>
                                                        <SideNavigationButton name={item.name} short_name={item.short_name} icon={item.icon} is_active={item.short_name==selectedBtn?.short_name} navigate={()=> {                                                            
                                                            if(item.toggle_drawer) {
                                                                setDrawerToggle(!drawerToggle)
                                                            }
                                                            item.navigate()
    
                                                        }} />
                                                    </>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="drawer-side z-50 ml-20">

                                <div className="menu p-4 w-80 min-h-full bg-neutral shadow-xl">

                                    <label htmlFor="reports-drawer" className="drawer-button cursor-pointer" onClick={()=> {
                                        setDrawerToggle(!drawerToggle)
                                    }}>
                                        <ArrowLeftIcon className={"h-6 w-6"} />
                                    </label>
                                    <div className={"pt-4 text-2xl font-semibold"}>
                                        Reports
                                    </div>
                                    <div className={"pt-5 flex flex-col space-y-4"}>
                                        <label htmlFor="reports-drawer" className="drawer-button text-lg cursor-pointer" onClick={() => {
                                            setDrawerToggle(!drawerToggle)
                                            // navigate("/reports/billing")
                                        }}>
                                            Billing Report
                                        </label>
                                    </div>
                                </div>
                            </div>
                </div>

            </div>
        </>
    )
}
