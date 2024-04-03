import {SignUpPageComponent} from '../../../molecules'


interface SignUpPageProps {
    onNavigate: (path: string) => void;
    AkelloLogo: any;
}

export const SignUpPage:React.FC<SignUpPageProps> = ({AkelloLogo, onNavigate}) => {


    debugger;
    return (
        <SignUpPageComponent
            AkelloLogo={AkelloLogo}
            onLoginClick={() => {
                onNavigate('/')
            }}
            onSignupSuccess={() => {
                onNavigate('/signup/confirm')
            }}
        />
    )
};
