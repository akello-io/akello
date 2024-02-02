import React, {ReactNode, useState} from "react";
import {useLocation} from "react-router-dom";
import {SideNavigationButton, SideNavigationButtonProps} from '../side-nav-btn';

export interface SideNavigationProps {
    logo: ReactNode
    top_navigation: SideNavigationButtonProps[]
    bottom_navigation: SideNavigationButtonProps[]
}

export const SideNavigation:React.FC<SideNavigationProps> = ({logo, top_navigation, bottom_navigation}) => {
    const [topNavigation, setTopNavigation] = useState(top_navigation)
    const [bottomNavigation, setBottomNavigation] = useState(bottom_navigation)
    const [selectedBtn, setSelectedBtn] = useState("Dashboard")

    return (
        <>
            <div>
                {/* Static sidebar for desktop */}

                <div className="drawer">
                    <input id="reports-drawer" type="checkbox" className="drawer-toggle" checked={false} />
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
                                                    <SideNavigationButton name={item.name} short_name={item.short_name} icon={item.icon} is_active={item.short_name==selectedBtn} navigate={()=> {
                                                        setSelectedBtn(item.short_name)
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
                                                        <SideNavigationButton name={item.name} short_name={item.short_name} icon={item.icon} is_active={item.short_name==selectedBtn} navigate={()=> {
                                                            setSelectedBtn(item.short_name)
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
                </div>

            </div>
        </>
    )
}
