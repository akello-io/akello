import {ReactNode} from 'react'
import HeaderComponent from "../../../apps/components/HeaderComponent";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useNavigate} from "react-router";
import {setSelectedRegistry} from "../../../reducers/appSlice";
import {SideNavigation} from "../Navigation/SideNavigation/SideNavigation";

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

    const selectedRegistry = useSelector ((state: RootState) => state.app.selectedRegistry)

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

    return (
        <>
            <div>
                <SideNavigation
                    role={"Admin"}
                    activeRoute={window.location.pathname}
                    navigate={(route) => {navigate(route)}}
                />
                <main className="pl-20 h-full">
                    {
                        fullscreen ? children :
                            <>
                                <HeaderComponent title={title} isLoading={isLoading} is_admin={is_admin} role={role} titleToolTip={titleToolTip} buttons={headerButtons} />
                                <div className={"px-2 py-4 "}>
                                    {children}
                                    <div className={"pl-6 pt-24 flex flex-row space-x-4"}>
                                        <div className={"font-bold"}>
                                            © 2023 akello.io
                                        </div>
                                        <a href={"/terms.html"} className={"text-ak-light-blue underline font-semibold cursor-pointer"}>
                                            Terms of Service
                                        </a>
                                        <a href={"/privacy.html"} className={"text-ak-light-blue underline font-semibold cursor-pointer"}>
                                            Privacy Policy
                                        </a>
                                    </div>
                                </div>
                            </>
                    }
                </main>
            </div>
        </>
    )
}


export default AppContainer