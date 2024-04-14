import React from 'react';
import { RegistryShell } from '../registry-shell';

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
    return (
        <>
            <RegistryShell
                    AppShell={AppShell}
                    registry_id={''}
                    Logo={''}
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
