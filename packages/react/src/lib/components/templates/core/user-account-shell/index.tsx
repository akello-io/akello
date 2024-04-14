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
    const akello = useAkello();

    // load all organizations
    // load all individual registeries
    // load all invites

    useEffect(() => {
        akello.userService.getUserRegistries((data: any) => {
            console.log('user registries', data);
        })

        akello.userService.getUserOrganizations((data: any) => {
            console.log('user organizations', data);
            // akello.selectOrganization(data[0].id);
        })

        akello.userService.getUserInvites((data: any) => {
            console.log('user invites', data);
        })

    })



    if(!akello.getSelectedOrganization()) {
        return (
            <div>
                <h1>Choose an organization</h1>
                <button onClick={() => {
                    const user = new User('test', 'test', 'test', 'test', 'test', 'test');
                    const org = new Organization('test', 'test', 'test', user);
                    akello.selectOrganization(org);
                    akello.dispatchEvent({ type: 'change' });

                }}>set org</button>
            </div>
        )
    }

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