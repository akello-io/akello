import { LoginComponent } from '../../../molecules';


interface LoginPageProps {
    onNavigate: (path: string) => void;
}

export const LoginPage:React.FC<LoginPageProps> = ({onNavigate}) => {
    return (
        <LoginComponent
            onSuccess={(token: string) => {
                console.log('token', token);
                onNavigate('/');
            }}
            onSignupClick={() => {
                onNavigate('/signup')
            }}
            onForgotPasswordClick={() => {
                onNavigate('/forgot-password')
            }}
        />
    );
};
