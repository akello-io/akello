import { AppShell, NavLink, Container, ScrollArea } from '@mantine/core';
import { IconHome2, IconTable, IconUserCircle, IconReportAnalytics } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PatientDetail from './PatientDetail';

const RegistryShell = () => {
    const akello = useAkello();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (
        <AppShell
            className={'w-screen'}
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: {
                    desktop: false,
                    mobile: false,
                },
            }}
            aside={{
                width: pathname === '/registry/'+akello.getSelectedRegistry().id ? 500 : 0,                
                collapsed: {
                    desktop: false,
                    mobile: true,
                },
                breakpoint: 'md',
            }}
            padding="md"
        >
            <Header loggedIn={true} toggle={() => {}} />
            <AppShell.Navbar>
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id + '/dashboard');
                    }}
                    label="Dashboard"
                    leftSection={<IconHome2 size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry().id + '/dashboard'}
                />
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id);
                    }}
                    label="Registry"
                    leftSection={<IconTable size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry().id}
                />
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id + '/team');
                    }}
                    label="Team"
                    leftSection={<IconUserCircle size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry().id + '/team'}
                />
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id + '/reports');
                    }}
                    label="Billing Report"
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/registry/' + akello.getSelectedRegistry().id + '/reports'}
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