import { ScrollArea, NavLink, Text, em } from '@mantine/core';
import {
    IconArrowBarUp,
    IconTable,
    IconReportAnalytics,
    IconLock,
    IconShieldCheck,
    IconReportMedical,
    IconBrandMyOppo
} from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { Header } from '../../../atoms';
import { useMediaQuery } from '@mantine/hooks';
import { MetriportPatientDetailContainer } from '../../medical/metriport-patient-detail-container';
import { useLocation } from 'react-router';


interface MetriportRgistryShellProps {
    AppShell: any;
    registry_id: string;
    Logo: any;
    onNavigate: (path: string) => void;
    signOut: () => void;
    pathname: string;
    Outlet?: any;
    stripe_checkout_url: string;
    stripe_portal_url: string;
}

export const MetriportRegistryShell:React.FC<MetriportRgistryShellProps> = ({
        Logo,
        AppShell,
        registry_id,
        onNavigate,
        pathname,
        Outlet,
        stripe_checkout_url,
        stripe_portal_url,
        signOut
    }) => {

    const akello = useAkello();
    const [opened, { toggle }] = useDisclosure();
    const [planTier, setPlanTier] = useState();
    const isMobile = useMediaQuery(`(max-width: ${em(880)})`);
    const selectedRegistry = akello.getSelectedRegistry();

    return (
        <AppShell
            className={'w-screen'}
            transitionDuration={0}
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: {
                    desktop: opened,
                    mobile: !opened,
                },
            }}
            aside={{
                width: akello.getSelectedPatientRegistry() ? 520 : 0,
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
                breakpoint: 'md',
            }}
            padding="md"
        >
            <Header signOut={signOut} loggedIn={true} Logo={Logo}  opened={opened} toggle={toggle} onNavigate={(path: any) => onNavigate(path) }/>
            <AppShell.Navbar>
                <Text pl={12} fz="xs" fw={450} mt="sm" >FAVORITES</Text>
                <NavLink
                    onClick={() => {
                        if (selectedRegistry) {
                            onNavigate('/registry');
                        }
                        if(isMobile) {
                            toggle()
                        }

                    }}
                    label="Registry"
                    leftSection={<IconTable size="1rem" stroke={1.5} />}
                    active={window.location.pathname.indexOf('registry') != -1 || window.location.pathname === '/'}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            <AppShell.Aside >
                {
                    akello.getSelectedPatientRegistry() &&  (
                        <ScrollArea>
                            <MetriportPatientDetailContainer registry_id={akello.getSelectedRegistry()!.id} selectedPatient={akello.getSelectedPatientRegistry()!} />
                        </ScrollArea>

                    )
                }

            </AppShell.Aside>
        </AppShell>
    );
};