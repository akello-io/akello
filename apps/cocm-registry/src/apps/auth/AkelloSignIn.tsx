import {SignIn} from '@akello/react'
import { useNavigate } from 'react-router'


const AkelloSignIn = () => {
    const navigate = useNavigate()
    
     
    return (
        <>
            <SignIn onSuccess={(token: string) => {
                    console.log(token)
                    navigate('/registry')
                    debugger;
                }} onFail={(err: string) => {
                    console.log(err)
                    debugger
                }}/>
        </>
    )
}

export default AkelloSignIn