import React, { useEffect } from 'react';
import { MetriportRegistryShell } from '../metriport-registry-shell';
import { RegistryShell } from '../registry-shell';
import { useAkello } from '@akello/react-hook';

import AkelloLogo from '../../../../assets/akello-blue.svg';

interface RegistryCollectionProps {
    AppShell: any;
    onNavigate: (path: string) => void;
    signOut: () => void;
    pathname: string;
    Outlet?: any;
    stripe_checkout_url: string;
    stripe_portal_url: string;

}


export const RegistryCollectionShell: React.FC<RegistryCollectionProps> = ({AppShell, onNavigate, signOut, pathname, Outlet, stripe_checkout_url, stripe_portal_url}) => {

    const akello = useAkello();
    if(!akello.getSelectedRegistry()) {
        return <div>Loading...</div>
    }

    return (
        <>
            <RegistryShell
                    AppShell={AppShell}
                    registry_id={''}
                    Logo={AkelloLogo}
                    onNavigate={onNavigate}
                    signOut={signOut}
                    pathname={pathname}
                    Outlet={Outlet}
                    stripe_checkout_url={stripe_checkout_url}
                    stripe_portal_url={stripe_portal_url}
            />
        </>
    )
}
