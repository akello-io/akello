import { TopNavigation, AppSidebarLayout, WelcomeTemplate, RegistrySelectRow, RegistryMemberships } from '@akello/react'
import { AkelloAPIService } from '@akello/core'
import {useEffect, useState} from "react";
import {Amplify, Auth} from 'aws-amplify';
import AkelloLogo from '../../src/images/logos/akello/akello-corner-logo.svg'
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
    const [service, setService] = useState<AkelloAPIService>()
    const [token, setToken] = useState<string>()
    const [registeries, setRegisteries] = useState([])
    const [profileImg, setProfileImg] = useState(GithubLogo)

    Auth.currentSession().then((session: any) => {
        let session_token = session.getIdToken().getJwtToken()
        setToken(session_token)
        setService(new AkelloAPIService(session_token))
        setProfileImg(session.getIdToken().payload['picture'])
        /**
         first_name: session.getIdToken().payload['given_name'],
         last_name: session.getIdToken().payload['family_name'],
         email: session.getIdToken().payload['email'],
         profile_photo: session.getIdToken().payload['picture'],
         */
    })

    useEffect(() => {
        if(service) {
            service.getUserRegistries((data: any) => {
                setRegisteries(data)
            }, (data: any) => {

            })
        }

    }, [token])

    return (
        <>
            <TopNavigation
                signIn={() => navigate('/login') }
                signOut={() => Auth.signOut()}
                profile_img={GithubLogo}
                github_url={token == undefined ? 'https://github.com/akello-io/akello': undefined}
                signed_in={token != undefined}/>
        </>
    )
}

export default HomePage