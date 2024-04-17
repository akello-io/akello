import { NavLink, Text, em } from '@mantine/core';
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
import { PatientDetail } from '../../../organisms/medical/patient-detail';

interface RegistryShellProps {
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

export const RegistryShell:React.FC<RegistryShellProps> = ({
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
                width: akello.getSelectedPatientRegistry() ? 500 : 0,
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
                <NavLink
                    onClick={() => {
                        if (selectedRegistry) {
                            onNavigate('/measurements');
                        }
                        if(isMobile) {
                            toggle()
                        }
                    }}
                    label="Measurements"
                    leftSection={<IconReportMedical size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/measurements'}
                />
                <NavLink
                    onClick={() => {
                        if (selectedRegistry) {
                            onNavigate('/reports');
                        }
                        if(isMobile) {
                            toggle()
                        }
                    }}
                    label="CoCM CPT Report"
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/reports'}
                />
                <Text pl={12} fz="xs" fw={450} mt="sm" >SETTINGS</Text>
                <NavLink
                    onClick={() => {
                        if (selectedRegistry) {
                            onNavigate('/security');
                        }
                        if(isMobile) {
                            toggle()
                        }
                    }}
                    label="Secruity"
                    leftSection={<IconLock size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/security'}
                />
                {

                    !planTier ? (
                        <NavLink
                            href={stripe_checkout_url + '?client_reference_id=' + selectedRegistry?.id}
                            label="Upgrade Plan"
                            leftSection={<IconArrowBarUp color='red' size="1rem" stroke={1.5} />}
                        />
                    ) : (
                        <NavLink
                            target='_blank'
                            href={stripe_portal_url}
                            label="Manage Subscription"
                            leftSection={<IconBrandMyOppo size="1rem" stroke={1.5} />}
                        />
                    )
                }
                <Text pl={12} fz="xs" fw={450} mt="sm" >SYSTEM AUDIT</Text>
                <NavLink
                    href='https://trust.akello.io/'
                    label="Trust Center"
                    target='_blank'
                    leftSection={<IconShieldCheck size="1rem" stroke={1.5} />}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
            <AppShell.Aside>
                {
                    akello.getSelectedPatientRegistry() &&  (
                        <PatientDetail registry_id={akello.getSelectedRegistry()!.id} selectedPatient={akello.getSelectedPatientRegistry()!} />
                    )
                }

            </AppShell.Aside>
        </AppShell>
    );
};