import {SignUpPageComponent} from '../../../molecules'


interface SignUpPageProps {
    onNavigate: (path: string) => void;
}

export const SignUpPage:React.FC<SignUpPageProps> = ({onNavigate}) => {


    debugger;
    return (
        <SignUpPageComponent
            onLoginClick={() => {
                onNavigate('/')
            }}
            onSignupSuccess={() => {
                onNavigate('/signup/confirm')
            }}
        />
    )
};
