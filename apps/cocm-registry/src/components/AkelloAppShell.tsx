import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AkelloAppShell = () => {
    return (
        <AppShell className="w-screen" header={{ height: 60 }} padding="md">
            <Header loggedIn={true} />
            <AppShell.Main>
                <Container>
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default AkelloAppShell;