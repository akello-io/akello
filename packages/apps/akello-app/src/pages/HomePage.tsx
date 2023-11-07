import { TopNavigation } from '@akello/react'
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


    Auth.currentSession().then((session: any) => {
        setToken(session.getIdToken().getJwtToken())
    }).catch(()=> {
        console.log('error')
    })

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
                signed_in={token != undefined}/>
        </>
    )
}

export default HomePage