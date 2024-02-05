import {AuthConfirmSignup} from '@akello/react'
import { useAkello } from '@akello/react-hook'
import { useNavigate } from 'react-router'


const AkelloConfirmSignuup = () => {
    const navigate = useNavigate()
    const akello = useAkello()
    

    debugger;        
    if(akello.getUserName() === undefined) {
        
        return (
            <div>
                <h1>Not signed in</h1>
                <button onClick={() => {navigate("/signup")}}>Sign up</button>
                <button onClick={() => {navigate("/login")}}>Login</button>
            </div>
        
        )
    }
    debugger
    
     
    return (
        <>
            <AuthConfirmSignup email={akello.getUserName()!} />
        </>
    )
}

export default AkelloConfirmSignuup