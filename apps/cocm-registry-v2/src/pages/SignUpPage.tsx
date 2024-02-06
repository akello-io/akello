import {SignUpForm} from '@akello/react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

    const navigate = useNavigate();
    return (
        <div>
            <SignUpForm onSuccess={() => navigate('/confirm')} onSiginClick={() => navigate('/login')}/>
        </div>
    );
}

export default SignUpPage;