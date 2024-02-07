import { AppShell, NavLink, Container} from '@mantine/core';
import { IconHome2, IconTable, IconUserCircle, IconReportAnalytics } from '@tabler/icons-react';
import {useAkello} from "@akello/react-hook"
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header';


const AkelloAppShell = () => {
    const akello = useAkello();
    const navigate = useNavigate();

    return (
        <AppShell
            className={'w-screen'}
            header={{ height: 60 }}                          
            padding="md"
        >        
            <Header loggedIn={true} toggle={()=>{}} />             
            <AppShell.Main>
                <Container>
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}

export default AkelloAppShell;