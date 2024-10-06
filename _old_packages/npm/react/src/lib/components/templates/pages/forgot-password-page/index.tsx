import { useNavigate } from 'react-router';
import { ForgotPasswordPageComponent } from '../../../molecules'
import {useAkello} from '@akello/react-hook';


interface ForgotPasswordPageProps {
    onNavigate: (path: string) => void;
}

export const ForgotPasswordPage:React.FC<ForgotPasswordPageProps> = ({onNavigate}) => {
    const akello = useAkello();
    return (
        <ForgotPasswordPageComponent onLoginClick={() => onNavigate('/')} onResetPasswordClick={() => {
            console.log('Reset password clicked');
        }}/>
    )
};


