import { TopNavigation, ThemeSwap } from '@akello/react'
import {useEffect, useState} from "react";
import {Amplify, Auth} from 'aws-amplify';
import GithubLogo from '../../src/images/logos/github-logo-vector.svg'
import {useNavigate} from "react-router";
import {useScrollPosition} from "../hooks/scroll-position";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface HomePageProps {
}


const HomePage:React.FC<HomePageProps> = () => {
    const token = useSelector((state: RootState) => state.app.token)
    const scrollPosition = useScrollPosition()
    const navigate = useNavigate()
    const local_theme = localStorage.getItem('theme')
    const [theme, setTheme] = useState(local_theme)
    console.log(theme)

    useEffect(() => {
        const html = document.querySelector('html');
        if(html && theme) {
            html.setAttribute('data-theme', theme)
        }
        localStorage.setItem('theme', theme ? theme : '')
    }, [theme]);


    return (
        <>
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
                        <li><a>Dashboard</a></li>
                        <li><a>Registry</a></li>
                        <li><a>Team</a></li>
                        <li><a>Reports</a></li>
                    </>
                }
                y_scroll_position={scrollPosition}
            />
            <div className={"bg-base-100 h-screen w-screen"}>
                Hero
            </div>
            <div className={"bg-base-200 h-screen w-screen"}>
                Who is Akello for?
            </div>
            <div className={"bg-base-100 h-screen w-screen"}>
                Get started quickly
            </div>
        </>
    )
}

export default HomePage