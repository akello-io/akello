import { useNavigate } from 'react-router';
import { ForgotPasswordPage as ForgotPasswordPageComponent } from '@akello/react';

const ForgotPasswordPage = () => {    
    const navigate = useNavigate();
    return (
        <ForgotPasswordPageComponent onLoginClick={() => navigate('/')} />
    )    
};


export default ForgotPasswordPage