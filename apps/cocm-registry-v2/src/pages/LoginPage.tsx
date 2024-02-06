import {SignInForm} from '@akello/react'
import { useNavigate } from 'react-router'
import { useRegistry } from '@akello/react-hook'


const LoginPage = () => {
    const navigate = useNavigate()
        
    return (
        <>
            <div className="flex h-screen">
                <div className="m-auto">
                    <SignInForm onSuccess={(token: string) => {                    
                        navigate('/')
                    }} onFail={(err: string) => {
                        console.log(err)                    
                    }} onSignupClick={() => navigate('/signup') }/>
                </div>
            </div>
     
            
        </>
    )
}

export default LoginPage