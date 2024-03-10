import { AppShell, NavLink, Burger } from '@mantine/core';
import { IconHome2, IconTable, IconUserCircle, IconReportAnalytics, IconRobot } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useDisclosure } from '@mantine/hooks';

import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PatientDetail from './PatientDetail';

const RegistryShell = () => {
    const akello = useAkello();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [opened, { toggle }] = useDisclosure();


    return (
        <AppShell
            className={'w-screen'}
            transitionDuration={0}
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: {
                    desktop: false,
                    mobile: !opened,
                },
            }}
            aside={{
                width: pathname === '/registry/'+(akello.getSelectedRegistry()?.id ?? '') ? 500 : 0,                
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
                breakpoint: 'md',
            }}
            padding="md"
        >            
            <Header loggedIn={true}  opened={opened} toggle={toggle}/>
            <AppShell.Navbar>
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/registry/' + selectedRegistry.id + '/dashboard');
                        }
                        toggle();
                    }}
                    label="Dashboard"
                    leftSection={<IconHome2 size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry()?.id + '/dashboard'}
                />
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/registry/' + selectedRegistry.id);
                        }
                        toggle();
                    }}
                    label="Registry"
                    leftSection={<IconTable size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry()?.id}
                />                
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + (akello.getSelectedRegistry()?.id ?? '') + '/team');
                        toggle();
                    }}
                    label="Team"
                    leftSection={<IconUserCircle size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + (akello.getSelectedRegistry()?.id ?? '') + '/team'}
                />                
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/registry/' + selectedRegistry.id + '/reports');
                        }
                        toggle();
                    }}
                    label="Billing Report"
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry()?.id + '/reports'}
                />                
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/registry/' + selectedRegistry.id + '/apps');
                        }
                        toggle();
                    }}
                    label="Akello Apps"
                    leftSection={<IconRobot size="1rem" stroke={1.5} />}
                    active={window.location.pathname.includes('/registry/' + akello.getSelectedRegistry()?.id + '/apps')}
                /> 
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />                
            </AppShell.Main>
            <AppShell.Aside>
                <PatientDetail />                                
            </AppShell.Aside>
        </AppShell>
    );
};

export default RegistryShell;