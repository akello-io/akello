import { useNavigate } from 'react-router';
import { LoginPage as LoginPageComponent } from "@akello/react";

const LoginPage = () => {
    const navigate = useNavigate();    



    return (
        <LoginPageComponent
            onSuccess={(token: string) => {
                console.log('token', token);
                navigate('/');
            }}            
            onSignupClick={() => navigate('/signup')}
            onForgotPasswordClick={() => navigate('/forgot-password')}
        />
    );    
};

export default LoginPage;
