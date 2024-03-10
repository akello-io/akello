import { AppShell, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AkelloAppShell = () => {
    return (
        <AppShell className="w-screen" header={{ height: 60 }} padding="md">
            <Header loggedIn={false} opened={false} toggle={function (): void {
                throw new Error('Function not implemented.');
            } } />
            <AppShell.Main>
                <Container>
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default AkelloAppShell;