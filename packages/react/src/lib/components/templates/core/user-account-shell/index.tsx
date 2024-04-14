import React, { useEffect } from 'react';
import { useAkello } from '@akello/react-hook';
import { RegistryCollectionShell } from '../registry-collection-shell';
import { AppShell } from '@mantine/core'
import { User, Organization } from '@akello/core';


interface UserAccountShellProps {
    navigate: (path: string) => void;
    pathname: string;
    signOut: () => void;
    stripe_checkout_url: string;
    stripe_portal_url: string;
    Outlet?: any;
}

export const UserAccountShell:React.FC<UserAccountShellProps> = ({
    navigate,
    pathname,
    signOut,
    Outlet,
    stripe_checkout_url,
    stripe_portal_url
}) => {

    return (
        <>
            <div>
                <RegistryCollectionShell
                        AppShell={AppShell}
                        onNavigate={(path: string) => navigate(path)}
                        pathname={pathname}
                        signOut={signOut}
                        Outlet={Outlet}
                        stripe_checkout_url={stripe_checkout_url}
                        stripe_portal_url={stripe_portal_url}
                />
            </div>
        </>
    )
}