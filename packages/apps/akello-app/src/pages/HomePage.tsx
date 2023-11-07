import { TopNavigation, ThemeSwap } from '@akello/react'
import {useEffect, useState} from "react";
import {Amplify, Auth} from 'aws-amplify';
import GithubLogo from '../../src/images/logos/github-logo-vector.svg'
import {useNavigate} from "react-router";

interface HomePageProps {
}


Amplify.configure({
    Auth: {
        region: process.env.REACT_APP_TEST_AWS_REGION,
        userPoolId: process.env.REACT_APP_TEST_AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_TEST_AWS_COGNITO_USER_POOL_APP_CLIENT_ID
    }
})


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
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
                    <div className="p-4 mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                        <div className="flex flex-col items-start max-w-3xl text-neutral-900">
                            <h1 className="pt-10 my-0 h-auto font-sans text-5xl font-extrabold tracking-normal text-black lg:text-7xl">
                                The Developer Platform for Integrated Care
                            </h1>
                            <div className="overflow-hidden relative mt-8 mb-10">
                                <p className="mb-0 font-sans text-2xl leading-normal xl:leading-normal font-medium">
                                    Akello is the open source developer platform that helps you build, test, and deliver any population health product or service.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={''} className={" max-w-3xl"}/>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default HomePage