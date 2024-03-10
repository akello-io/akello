import {SignupConfirmationForm} from '@akello/react'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router'


const AkelloConfirmSignuup = () => {
    const navigate = useNavigate()
    const akello = useAkello()
        
    if(akello.getUserName() === undefined) {
        navigate('/signin')
    }
     
    return (
        <>
            <SignupConfirmationForm onSuccess={() => {
                console.log('success confirming')
                navigate('/')
            }} onFail={() => {
                console.log('failed confirming')
                debugger;
            }} email={akello.getUserName()!} />
        </>
    )
}

export default AkelloConfirmSignuup