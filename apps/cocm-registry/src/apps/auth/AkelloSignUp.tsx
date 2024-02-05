import {AuthSignup} from '@akello/react'
import { useNavigate } from 'react-router'

const AkelloSignUp = () => {    
    const navigate = useNavigate()
    return (
        <>
            <AuthSignup onSuccess={() =>  navigate('/confirm')}   onSiginClick={() => {navigate("/signup")}}/>
        </>
    )
}

export default AkelloSignUp