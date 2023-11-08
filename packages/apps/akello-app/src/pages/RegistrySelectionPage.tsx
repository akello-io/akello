import {WelcomeTemplate, RegistryMemberships, RegistrySelectRow} from '@akello/react'
import AkelloLogo from '../../src/images/logos/akello/akello-corner-logo.svg'


const RegistrySelectionPage = () => {

    return (
        <div className={'w-screen h-auto bg-base-200/40'}>
            <WelcomeTemplate first_name={'Vijay'}>

                <RegistryMemberships>

                    <RegistrySelectRow
                        logo={AkelloLogo}
                        name={'Registry A'}
                        members={5}
                        patients={5}
                        onClick={() => {}}
                    />

                    <RegistrySelectRow
                        logo={AkelloLogo}
                        name={'Registry B'}
                        members={5}
                        patients={5}
                        onClick={() => {}}
                    />


                </RegistryMemberships>

            </WelcomeTemplate>
        </div>
    )
}

export default RegistrySelectionPage