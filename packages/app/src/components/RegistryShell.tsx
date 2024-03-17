import { AppShell, NavLink, Text } from '@mantine/core';
import { IconTable, IconReportAnalytics, IconLock, IconShieldCheck, IconReportMedical, IconReceipt2, IconUsers } from '@tabler/icons-react';
import { useAkello } from "@akello/react-hook";
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { Registry } from '@akello/core';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PatientDetail from './PatientDetail';

const RegistryShell = () => {
    const akello = useAkello();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [opened, { toggle }] = useDisclosure();
    
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
                navigate('/create-registry');
            } else {                
                akello.selectRegistry(registeries[0]);
            }
        });
    }, []);
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
            <Header loggedIn={true}  opened={opened} toggle={toggle}/>
            <AppShell.Navbar>
                <Text pl={12} fz="xs" fw={450} mt="sm" >FAVORITES</Text>
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/registry');
                        }                        
                    }}
                    label="Registry"
                    leftSection={<IconTable size="1rem" stroke={1.5} />}
                    active={window.location.pathname.indexOf('registry') != -1 || window.location.pathname === '/'}
                />     
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/measurements');
                        }                        
                    }}
                    label="Measurements"
                    leftSection={<IconReportMedical size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/measurements'}
                />           
                
                <Text pl={12} fz="xs" fw={450} mt="sm" >BILLING</Text>
                  
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/reports');
                        }                        
                    }}
                    label="Billing Report"
                    leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/reports'}
                />                                          
                <Text pl={12} fz="xs" fw={450} mt="sm" >SETTINGS</Text>
                <NavLink
                    onClick={() => {
                        const selectedRegistry = akello.getSelectedRegistry();
                        if (selectedRegistry) {
                            navigate('/security');
                        }                        
                    }}
                    label="Secruity"
                    leftSection={<IconLock size="1rem" stroke={1.5} />}
                    active={window.location.pathname === '/security'}
                /> 
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
                <PatientDetail />
            </AppShell.Aside>
            <AppShell.Footer zIndex={300}>
                <div className="text-center">
                    built with ❤️ by Akello
                </div>
            </AppShell.Footer>
        </AppShell>
    );
};

export default RegistryShell;