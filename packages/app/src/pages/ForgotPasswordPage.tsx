import { useNavigate } from 'react-router';
import { ForgotPasswordPage as ForgotPasswordPageComponent } from '@akello/react';
import {useAkello} from '@akello/react-hook';

const ForgotPasswordPage = () => {    
    const navigate = useNavigate();
    const akello = useAkello();
    return (
        <ForgotPasswordPageComponent onLoginClick={() => navigate('/')} onResetPasswordClick={() => {
            console.log('Reset password clicked');            
        }}/>
    )    
};


export default ForgotPasswordPage