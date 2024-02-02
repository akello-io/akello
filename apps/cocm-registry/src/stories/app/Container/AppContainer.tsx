import {ReactNode} from 'react'
import HeaderComponent from "../../../apps/components/HeaderComponent";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useLocation, useNavigate} from "react-router";
import {setSelectedRegistry} from "../../../reducers/appSlice";
// import {SideNavigation} from "../Navigation/SideNavigation/SideNavigation";
import { PageFooter, SideNavigation, SideNavigationButtonProps } from '@akello/react';
import AkelloLogoCorner from "../../../images/logos/akello/akello-corner-logo.svg";

import {
    CalendarDaysIcon,
    ChartBarSquareIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    TableCellsIcon,
    UserGroupIcon,   
    Cog8ToothIcon 
} from '@heroicons/react/24/outline'
import path from 'path';

interface AppContainerProps {
    children: ReactNode
    title: string
    is_admin?: boolean
    role?: string
    titleToolTip?: string
    signOut?: (data?: any | undefined) => void
    headerButtons?: ReactNode[]
    fullscreen?: boolean
    isLoading?: boolean
}

export const AppContainer:React.FC<AppContainerProps> = ({children, title, is_admin, isLoading, role, titleToolTip,  headerButtons, fullscreen, signOut}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()    

    const { pathname } = useLocation()    
    const [selectedBtn, setSelectedBtn] = useState<SideNavigationButtonProps>()

    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)

    let size = 'w-6 h-auto'
    const iconMap = new Map<string, any>()
    iconMap.set("table",  <TableCellsIcon className={size} /> )
    iconMap.set("calendar", <CalendarDaysIcon className={size} />)
    iconMap.set("chart", <ChartBarSquareIcon className={size} /> )
    iconMap.set("chat", <ChatBubbleLeftRightIcon className={size} /> )
    iconMap.set("heart", <HeartIcon className={size} /> )
    iconMap.set("team", <UserGroupIcon className={size} /> )
    iconMap.set("gear", <Cog8ToothIcon className={size} /> )

    const dashboard_btn = {name: "Dashboard", short_name: "Dashboard", icon: <>{iconMap.get('calendar')}</>, is_active: false, navigate: () => { navigate('/dashboard')}} 
    const registry_btn = {name: "Registry", short_name: "Registry", icon: <>{iconMap.get('table')}</>, is_active: false, navigate: () => {navigate('/registry')}}
    const team_btn = {name: "Team", short_name: "Team", icon: <>{iconMap.get('team')}</>, is_active: false, navigate: () => {navigate('/team')}} 
    const reports_btn = {name: "Reports", short_name: "Reports", icon: <>{iconMap.get('chart')}</>, is_active: false, navigate: () => {}, toggle_drawer: true}  
    const top_navigation = [
        dashboard_btn,
        registry_btn,
        team_btn,
        reports_btn
    ] as SideNavigationButtonProps[]
    const bottom_navigation = [] as SideNavigationButtonProps[]
       

    useEffect(() => {
        if(!selectedRegistry.id) {
            let stored_selection = localStorage.getItem("selectedRegistry")
            if(stored_selection) {
                dispatch(setSelectedRegistry(JSON.parse(stored_selection)))
            } else {
                navigate("/")
            }
        }
    }, [selectedRegistry])

    useEffect(() => {
        if(pathname.indexOf('dashboard') != -1) {            
            setSelectedBtn(dashboard_btn!)
        }
        if(pathname.indexOf('registry') != -1) {            
            setSelectedBtn(registry_btn!)
        }
        if(pathname.indexOf('team') != -1) {            
            setSelectedBtn(team_btn!)
        }
        if(pathname.indexOf('reports') != -1) {            
            setSelectedBtn(reports_btn!)
        }
        
    }, [pathname])

    return (
        <>
            <div>                
                <SideNavigation
                    logo={<a href={"/"}><img src={AkelloLogoCorner} alt="Akello Health" /></a>}
                    top_navigation={top_navigation}
                    bottom_navigation={bottom_navigation}
                    selectedBtn={selectedBtn!}
                />
                <main className="pl-20 h-full">
                    {
                        fullscreen ? children :
                            <>
                                <HeaderComponent title={title} isLoading={isLoading} is_admin={is_admin} role={role} titleToolTip={titleToolTip} buttons={headerButtons} />
                                <div className={"px-2 py-4 "}>
                                    {children}
                                    <PageFooter terms_of_service_link='https://akello.io/terms' privacy_policy_link='https://akello.io/privacy' />
                                </div>
                            </>
                    }
                </main>
            </div>
        </>
    )
}


export default AppContainer