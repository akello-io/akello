import { SignUpConfirm as SignUpConfirmComponent } from '../../../molecules'

interface SignUpConfirmPageProps {
    onNavigate: (path: string) => void;
}

export const SignUpConfirmPage:React.FC<SignUpConfirmPageProps> = ({onNavigate}) => {
    return (
        <SignUpConfirmComponent onConfirmSuccess={() => onNavigate("/")} />
    )
};

