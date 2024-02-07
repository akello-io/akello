import {SignupConfirmationForm} from '@akello/react'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router'


const SignUpConfirm = () => {
    const navigate = useNavigate()    
    const akello = useAkello()        
    
    if(akello.accessToken === undefined) {
        navigate('/login')
    }
     
    return (
        <>
            <SignupConfirmationForm onSuccess={() => {                
                navigate('/login')
            }} onFail={() => {                
                debugger;                
            }} email={akello.getUserName()!} />
        </>
    )
}

export default SignUpConfirm