import { useNavigate } from 'react-router';
import { SignUpConfirm as SignUpConfirmComponent } from '@akello/react';

const SignUpConfirm = () => {    
    const navigate = useNavigate();

    return (
        <>
            <SignUpConfirmComponent onConfirmSuccess={() => navigate('/')} />
        </>
    )
    
};

export default SignUpConfirm;
