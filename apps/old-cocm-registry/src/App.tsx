import {Amplify, Auth} from 'aws-amplify';
import React, {useState, Suspense, ReactNode, useEffect} from 'react';

import '@aws-amplify/ui-react/styles.css';
import {Routes, Navigate} from "react-router-dom";
import {Route, useLocation, useNavigate} from "react-router";
import FinancialModelList from "./apps/financial-model/FinancialModelList";
import {FinancialModelDetail} from "./apps/financial-model/FinancialModelDetail";
import FinancialModelCreate from "./apps/financial-model/FinancialModelCreate";
import RegistryComponent from "./apps/registry/RegistryComponent";
import UpgradeComponent from "./apps/upgrade/UpgradeComponent";
import {useAkello} from '@akello/react-hook'
import {AkelloClient} from '@akello/core'
import TeamComponent from "./apps/team/TeamComponent";
import Dashboard from "./apps/dashboard/Dashboard";
import CalendarComponent from "./apps/calendar/CalendarComponent";
import MessagesComponent from "./apps/messages/MessagesComponent";
import RegistrySelector from "./apps/registry_list/RegistrySelector";
import ReportsComponent from "./apps/reports/ReportsComponent";
import RegistryCreate from "./apps/registry-create/RegistryCreate";
import ProfileComponent from "./apps/profile/ProfileComponent";
import BillingReport from "./apps/reports/billing/BillingReport";
import RegistryReport from "./apps/reports/registry/RegistryReport";
import "./App.css"
import AkelloSignIn from './apps/auth/AkelloSignIn';
import AkelloSignUp from './apps/auth/AkelloSignUp';
import AkelloConfirmSignuup from './apps/auth/AkelloConfirmSignup';
import { AppShell, Burger, NavLink} from '@mantine/core';
import { createTheme, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';


const theme = createTheme({
    /** Your theme override here */
});
  

const AkelloRoutes = () => {
    const akello = useAkello()
    const [opened, { toggle }] = useDisclosure();
    const [active, setActive] = useState(0);

    const { pathname } = useLocation()
    const data = [
        { icon: IconGauge, label: 'Dashboard', description: 'Item with description' },
        {
          icon: IconFingerprint,
          label: 'Security',
          rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
        },
        { icon: IconActivity, label: 'Activity' },
      ];
      
      const items = data.map((item, index) => (
        <NavLink
          href="#required-for-focus"
          key={item.label}
          active={index === active}
          label={item.label}
          description={item.description}
          rightSection={item.rightSection}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={() => setActive(index)}
    
        />
      ));
    

    if(!akello.accessToken) {
        return (
            <>        
                <Routes>
                    <Route path={"/login"} element={<AkelloSignIn />} />
                    <Route path={"/signup"} element={<AkelloSignUp />} />
                    <Route path={"/confirm"} element={<AkelloConfirmSignuup />} />
                    <Route path={"*"} element={<Navigate to="/login" />} />                    
                </Routes>            
            </>
        )
    }
    if(pathname == '/' || pathname =='/registry/create') {
        return (
            <Routes>                                                    
                <Route path={"/"} element={<RegistrySelector />} />
                <Route path={"/registry/create"} element={<RegistryCreate />} />
            </Routes>
        )
    }
    return (
        <>
            <MantineProvider theme={theme}>
                <AppShell
                    header={{ height: 60 }}
                    navbar={{
                        width: 300,
                        breakpoint: 'sm',
                        collapsed: { mobile: !opened },
                    }}
                    padding="md"
                    >
                    <AppShell.Header>
                        <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                        />
                        <div>Logo</div>
                    </AppShell.Header>
                    <AppShell.Navbar p="md">
                        {items}
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <Routes>                                                                                
                            <Route path={"/profile"} element={<ProfileComponent />} />                            
                            <Route path={"/dashboard"} element={<Dashboard />} />
                            <Route path={"/calendar"} element={<CalendarComponent />} />
                            <Route path={"/messages"} element={<MessagesComponent />} />
                            <Route path={"/health"} element={<Dashboard />} />
                            <Route path={"/team"} element={<TeamComponent />} />
                            <Route path={"/reports"} element={<ReportsComponent />} />
                            <Route path={"/reports/billing"} element={<BillingReport />} />
                            <Route path={"/reports/registry"} element={<RegistryReport />} />
                            <Route path={"/registry"} element={<RegistryComponent />} />
                            <Route path={"/model"} element={<FinancialModelDetail />} />
                            <Route path={"/models"} element={<FinancialModelList />} />
                            <Route path={"/models/create"} element={<FinancialModelCreate />} />
                            <Route path={"/models/:model_name"} element={<FinancialModelDetail />} />
                            <Route path={"/upgrade"} element={<UpgradeComponent />} />                                                                    
                        </Routes>    
                    </AppShell.Main>                   
                </AppShell>                    
            </MantineProvider>
                           
        </>
    )   
}

function App() {    
        
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AkelloRoutes />
            </Suspense>
            
        </>

    );
}

export default App;