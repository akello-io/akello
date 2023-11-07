import { TopNavigation, ThemeSwap } from '@akello/react'
import {useEffect, useState} from "react";
import {Amplify, Auth} from 'aws-amplify';
import GithubLogo from '../../src/images/logos/github-logo-vector.svg'
import {useNavigate} from "react-router";

interface HomePageProps {
}


const HomePage:React.FC<HomePageProps> = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string>()
    const local_theme = localStorage.getItem('theme')
    const [theme, setTheme] = useState( local_theme ? local_theme : 'light')

    // initially set the theme and "listen" for changes to apply them to the HTML tag
    useEffect(() => {
        document.querySelector('html')!.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    }, [theme]);


    Auth.currentSession().then((session: any) => {
        setToken(session.getIdToken().getJwtToken())
    }).catch(()=> {
        console.log('error')
    })

    const instance = (<ThemeSwap theme={theme} setTheme={setTheme}/>)

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
                theme_swapper={instance}
                menu_items={
                    <>
                        <li><a>Dashboard</a></li>
                        <li><a>Registry</a></li>
                        <li><a>Team</a></li>
                        <li><a>Reports</a></li>
                    </>
                }
            />

        </>
    )
}

export default HomePage