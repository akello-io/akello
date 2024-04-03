import { NavLink, Text, em } from '@mantine/core';
import { IconArrowBarUp, IconTable, IconReportAnalytics, IconLock, IconShieldCheck, IconReportMedical, IconBrandMyOppo } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { Registry } from '@akello/core';
import { Header } from '../../../atoms';
import { PatientDetail } from '../../../organisms';
import { useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { modals } from '@mantine/modals';


interface RegistryShellProps {
    AppShell: any;
    Logo: any;
    onNavigate: (path: string) => void;
    pathname: string;
    Outlet?: any;
}

export const RegistryShell:React.FC<RegistryShellProps> = ({Logo, AppShell, onNavigate, pathname, Outlet}) => {
    const akello = useAkello();
    const [opened, { toggle }] = useDisclosure();
    const [evaluationModal, evaluationModalHandlers] = useDisclosure(false);
    const [planTier, setPlanTier] = useState();
    const isMobile = useMediaQuery(`(max-width: ${em(880)})`);
    const selectedRegistry = akello.getSelectedRegistry();

    useEffect(() => {

        akello.userService.getUserRegistries((data) => {
            const registeries = data.map((registry: any) => {
                return new Registry(
                    registry['id'],
                    registry['name'],
                    registry['description'],
                    registry['active_patients'],
                    registry['members'],
                    registry['questionnaires'],
                    {
                        total_minutes: registry['total_minutes'],
                        completed_minutes: registry['completed_minutes'],
                        safety_risk: registry['safety_risk']
                    }
                );
            });

            if(registeries.length == 0) {
                onNavigate('/create-registry');
            } else {
                akello.selectRegistry(registeries[0]);
                akello.dispatchEvent({ type: 'change' });
            }
        });
    }, []);

    useEffect(() => {
        if(akello.getSelectedRegistry() != undefined) {
            akello.registryService.checkSubscription(akello.getSelectedRegistry()!.id, (data: any) => {
                setPlanTier(data);
                if(data !== 'Individual') {
                    evaluationModalHandlers.open()
                }
            }, (error: any) => {

            })
        }
    }, [])

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
                width: pathname.indexOf('registry') != -1 ? 500 : 0,
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
                breakpoint: 'md',
            }}
            padding="md"
        >
            <Modal
                opened={evaluationModal}
                onClose={evaluationModalHandlers.close}
                title="Evaluation plan"
                size={"sm"}
                zIndex={1000}
            >
                <Text size={'lg'} fw={700}>For evaluation only</Text>
                <Text>You are currently using Akello’s evaluation plan. We recommend using this plan to familiarize yourself with Akello’s platform and understand how it can meet your specific needs. If you plan on adding real <span className='font-semibold'>patient data</span> be sure to upgrade to a paid plan, which will include a Business Associate Agreement (BAA).</Text>
                <Button onClick={() => {
                    window.location.href = import.meta.env.VITE_STRIPE_CHECKOUT_URL+'?client_reference_id=' + selectedRegistry?.id
                }}>Upgrade Plan</Button>
            </Modal>
            <Header loggedIn={true} Logo={Logo}  opened={opened} toggle={toggle} onNavigate={(path: any) => onNavigate(path) }/>
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
                            href={import.meta.env.VITE_STRIPE_CHECKOUT_URL+'?client_reference_id=' + selectedRegistry?.id}
                            label="Upgrade Plan"
                            leftSection={<IconArrowBarUp color='red' size="1rem" stroke={1.5} />}
                        />
                    ) : (
                        <NavLink
                            target='_blank'
                            href={import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL}
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
                <PatientDetail onStartSession={() => onNavigate('/patient/' + (akello.getSelectedPatientRegistry()?.id ?? '') + '/treatment-session')} />
            </AppShell.Aside>
        </AppShell>
    );
};