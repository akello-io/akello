import {WelcomeTemplate, RegistryMemberships, RegistrySelectRow} from '@akello/react'
import AkelloLogo from '../../src/images/logos/akello/akello-corner-logo.svg'
import {useNavigate} from "react-router";


const RegistrySelectionPage = () => {

    const navigate = useNavigate()

    return (
        <div className={'w-screen h-auto bg-base-200/40'}>
            <WelcomeTemplate first_name={'Vijay'}>

                <RegistryMemberships>

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