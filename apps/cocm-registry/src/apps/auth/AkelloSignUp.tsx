import {AuthSignup} from '@akello/react'
import { useNavigate } from 'react-router'

const AkelloSignUp = () => {    
    const navigate = useNavigate()
    return (
        <>
            <AuthSignup onSiginClick={() => {navigate("/login")}}/>
        </>
    )
}

export default AkelloSignUp