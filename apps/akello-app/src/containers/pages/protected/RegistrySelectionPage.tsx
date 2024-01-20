import {WelcomeTemplate, RegistryMemberships, RegistrySelectRow, TopNavigation} from '@akello/react'
import AkelloLogo from '../../../images/logos/akello/akello-corner-logo.svg'
import {useNavigate} from "react-router";
import {Auth} from "aws-amplify";


const RegistrySelectionPage = () => {

    const navigate = useNavigate()

    return (
        <div className={'w-screen h-auto bg-base-200/40'}>
            <TopNavigation 
                signIn={()=> {}} 
                signOut={()=>{Auth.signOut()}} 
                profile_img="profile_img" 
                signed_in={true} 
                menu_items={[]}
                theme_swapper={true}
                />
            <WelcomeTemplate first_name={'Vijay'}>

                <RegistryMemberships onCreate={()=> {
                    navigate('/registry/create')
                }}>
                    <RegistrySelectRow
                        logo={AkelloLogo}
                        name={'Registry A'}
                        members={5}
                        patients={5}
                        onClick={() => {navigate('/dashboard')}}
                    />

                    <RegistrySelectRow
                        logo={AkelloLogo}
                        name={'Registry B'}
                        members={5}
                        patients={5}
                        onClick={() => {navigate('/dashboard')}}
                    />
                </RegistryMemberships>
            </WelcomeTemplate>
        </div>
    )
}

export default RegistrySelectionPage