import { AppShell, NavLink, Container } from '@mantine/core';
import { IconHome2, IconTable, IconUserCircle, IconReportAnalytics } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header';

const RegistryShell = () => {
    const akello = useAkello();
    const navigate = useNavigate();

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
                width: 0,
                collapsed: {
                    desktop: false,
                    mobile: false,
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
                />
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id);
                    }}
                    label="Registry"
                    leftSection={<IconTable size="1rem" stroke={1.5} />}
                />
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id + '/team');
                    }}
                    label="Team"
                    leftSection={<IconUserCircle size="1rem" stroke={1.5} />}
                />
                <NavLink
                    onClick={() => {
                        navigate('/registry/' + akello.getSelectedRegistry().id + '/reports');
                    }}
                    label="Billing Report"
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default RegistryShell;