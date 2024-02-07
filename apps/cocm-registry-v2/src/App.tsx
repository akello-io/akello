import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import Header from './components/Header';
import { AppShell, NavLink, Container} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RegistryPage from './pages/registry/RegistryPage';
import AppHomePage from './pages/AppHomePage';
import { useEffect, useState } from 'react';
import { IconHome2, IconTable, IconGauge, IconUserCircle, IconReportAnalytics } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import DashboardPage from './pages/registry/DashboardPage';
import TeamPage from './pages/registry/TeamPage';
import ReportsPage from './pages/registry/ReportsPage';
import PatientReferralPage from './pages/registry/PatientReferralPage';
import PatientDetail from './components/PatientDetail';



export default function App() {
  const [opened, drawerHandlers] = useDisclosure({ initialOpened: true });  
  const akello = useAkello();
  const navigate = useNavigate();
  const [showPatientDetail, setShowPatientDetail] = useState(false);
  const {pathname} = useLocation()

  useEffect(() => {
    if(akello.getSelectedRegistry() == undefined) {  
      navigate('/')
    }  
    if(akello.getSelectedRegistry() != undefined) {        
      navigate(`/registry/${akello.getSelectedRegistry()}`)                                           
    }
  }, [akello]);
  
  const renderPublicRoutes = () => (
    <Routes>
      <Route path={"/confirm"} element={<SignUpConfirm />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/signup"} element={<SignUpPage />} />
      <Route path={"*"} element={<Navigate to="/login" />} />
    </Routes>
  );

  const renderPrivateRoutes = () => (
    <Routes>
      <Route path={"/"} element={<AppHomePage drawerHandlers={drawerHandlers} />} />
      <Route path={"/registry/create"} element={<div>add registry</div>} />            
      <Route path={"/registry/:registry_id"} element={<RegistryPage drawerHandlers={drawerHandlers} />} />
      <Route path={"/registry/:registry_id/dashboard"} element={<DashboardPage />} />
      <Route path={"/registry/:registry_id/team"} element={<TeamPage />} />
      <Route path={"/registry/:registry_id/reports"} element={<ReportsPage />} />
      <Route path={"/registry/:registry_id/patient-referral"} element={<PatientReferralPage />} />      
    </Routes>
  )
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  const renderAppShell = (loggedIn: boolean) => (
    <AppShell
      className={'w-screen'}
      header={{ height: 60 }}      
      navbar={{
        width: loggedIn && pathname.indexOf('registry') != -1 ? 200 : 0,        
        breakpoint: 'sm',
        collapsed: {
          desktop: !opened,
          mobile: !opened,
        },
      }}
      aside={{ 
        width: 400,
        collapsed: {
          desktop: !showPatientDetail,
          mobile: !showPatientDetail,
        },
        breakpoint: 'md', // Add the missing 'breakpoint' property with a valid value
      }}
      padding="md"
    >
      <Header loggedIn={loggedIn} toggle={drawerHandlers.toggle} />
      {
      loggedIn && pathname.indexOf('registry') != -1 &&       
        <AppShell.Navbar height={600} p="xs" width={{ base: 300 }}>          
          <NavLink
            onClick={() => {        
              setShowPatientDetail(false)             
              navigate('/registry/' + akello.selectedRegistry +'/dashboard')
            }}
            label="Dashboard"
            leftSection={<IconGauge size="1rem" stroke={1.5} />}
          />
          <NavLink
            onClick={() => {              
              setShowPatientDetail(true)             
              navigate('/registry/' + akello.selectedRegistry )
            }}
            label="Registry"
            leftSection={<IconTable size="1rem" stroke={1.5} />}
          />
          <NavLink
            onClick={() => {              
              setShowPatientDetail(false)             
              navigate('/registry/' + akello.selectedRegistry + '/team')
            }}
            label="Team"
            leftSection={<IconUserCircle size="1rem" stroke={1.5} />}
          />
          <NavLink
            onClick={() => {     
              setShowPatientDetail(false)                      
              navigate('/registry/' + akello.selectedRegistry + '/reports')
            }}
            label="Billing Report"
            leftSection={<IconReportAnalytics size="1rem" stroke={1.5} />}
          />
        </AppShell.Navbar>
      }
      
      <AppShell.Main>                
        <div className="flex h-screen">
          <div className="mx-auto w-full">
            {loggedIn ? renderPrivateRoutes() : renderPublicRoutes()}    
          </div>
        </div>        
      </AppShell.Main>
      {
        loggedIn && pathname.indexOf('registry') != -1  && (
          <AppShell.Aside p="md">
            <PatientDetail />
          </AppShell.Aside>
        )
      }
          
    </AppShell>
  );

  if (akello == undefined || akello.accessToken == undefined) {
    return renderAppShell(false);
  }  
  
  return renderAppShell(true);
}