import {SignUpPage as SignUpPageComponent} from '../../../molecules'


interface SignUpPageProps {
    onNavigate: (path: string) => void;
}

const SignUpPage:React.FC<SignUpPageProps> = ({onNavigate}) => {

    return (
        <SignUpPageComponent
            onLoginClick={() => onNavigate('/')}
            onSignupSuccess={() => onNavigate('/signup/confirm')}
        />
    )
};

export default SignUpPage;
