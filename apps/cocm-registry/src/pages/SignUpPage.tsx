import { useNavigate } from 'react-router';
import {SignUpPage as SignUpPageComponent} from '@akello/react';


const SignUpPage = () => {    
    const navigate = useNavigate();

    return (
        <SignUpPageComponent 
            onLoginClick={() => navigate('/')} 
            onSignupSuccess={() => navigate('/signup/confirm')}
        />
    )
};

export default SignUpPage;
