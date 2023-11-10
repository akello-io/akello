import {useEffect, useState} from "react";
import * as React from "react";
import {SideNavigation, AppHeaderSection} from '@akello/react'
import {top_nav_buttons, bottom_nav_buttons, LogoButton } from "../side_nav_buttons";


interface PageContainerProps {
    children: React.ReactNode;
    title: string
}

const PageContainer:React.FC<PageContainerProps> = ({children, title}) => {
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
                    logo={<LogoButton />}
                    top_navigation={top_nav_buttons}
                    bottom_navigation={bottom_nav_buttons}
                />
                <div className="pl-20 h-full">
                    <>
                        <AppHeaderSection title={title} />
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
                </div>
            </div>
        </>
    )
}

export default PageContainer