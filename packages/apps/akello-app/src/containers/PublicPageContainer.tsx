import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useScrollPosition} from "../hooks/scroll-position";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import GithubLogo from "../images/logos/github-logo-vector.svg";
import { TopNavigation, ThemeSwap } from '@akello/react'
import * as React from "react";
import {SideNavigation} from '@akello/react'
import AkelloLogo from '../images/logos/akello/akello-corner-logo.svg'
import top_nav_buttons from "../side_nav_buttons";


interface PublicPageContainerProps {
    children: React.ReactNode;
}

const PublicPageContainer:React.FC<PublicPageContainerProps> = ({children}) => {
    const token = useSelector((state: RootState) => state.app.token)
    const scrollPosition = useScrollPosition()
    const navigate = useNavigate()
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
                <TopNavigation
                    signIn={() => navigate('/login') }
                    signOut={async () => {
                        if (!Auth || typeof Auth.signOut !== 'function') {
                            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
                        }
                        Auth.signOut()
                            .then(() => {
                                window.location.reload();
                            })
                            .catch(err => {
                                debugger;
                            });

                    }}
                    profile_img={GithubLogo}
                    github_url={token == undefined ? 'https://github.com/akello-io/akello': undefined}
                    signed_in={token != undefined}
                    theme_swapper={<ThemeSwap theme={theme!} setTheme={setTheme}/>}
                    menu_items={
                        <>
                            <li><button onClick={()=> navigate('/dashboard')}>Dashboard</button></li>
                            <li><a>Registry</a></li>
                            <li><a>Team</a></li>
                            <li><a>Reports</a></li>
                        </>
                    }
                    y_scroll_position={scrollPosition}
                />
                {children}
            </div>
        </>
    )
}

export default PublicPageContainer