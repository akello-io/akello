import {useEffect, useState} from "react";
import * as React from "react";
import {SideNavigation} from '@akello/react'
import AkelloLogo from '../images/logos/akello/akello-corner-logo.svg'
import top_nav_buttons from "../side_nav_buttons";


interface PageContainerProps {
    children: React.ReactNode;
}

const PageContainer:React.FC<PageContainerProps> = ({children}) => {
    const local_theme = localStorage.getItem('theme')
    const [theme, setTheme] = useState(local_theme)

    useEffect(() => {
        const html = document.querySelector('html');
        if(html && theme) {
            html.setAttribute('data-theme', theme)
        }
        localStorage.setItem('theme', theme ? theme : '')
    }, [theme]);


    return (
        <>
            <div className={"flex flex-col"}>
                <SideNavigation
                    logo={AkelloLogo}
                    top_navigation={top_nav_buttons}
                    bottom_navigation={top_nav_buttons}
                />
                <div className={'pl-20'}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default PageContainer