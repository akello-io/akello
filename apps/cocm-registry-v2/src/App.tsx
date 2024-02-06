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
import { useEffect } from 'react';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';



export default function App() {
  const [opened, drawerHandlers] = useDisclosure({ initialOpened: true });  
  const akello = useAkello();
  const navigate = useNavigate();
  const {pathname} = useLocation()

  useEffect(() => {
    if(akello.getSelectedRegistry() == undefined) {  
      navigate('/')
    }  
    if(akello.getSelectedRegistry() != undefined) {        
      navigate(`/registry/${akello.getSelectedRegistry()}`)       
      debugger;                                   
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
      <Route path={"/registry/:registry_id/dashboard"} element={<RegistryPage drawerHandlers={drawerHandlers} />} />
      <Route path={"/registry/:registry_id/team"} element={<RegistryPage drawerHandlers={drawerHandlers} />} />
      <Route path={"/registry/:registry_id/reports"} element={<RegistryPage drawerHandlers={drawerHandlers} />} />
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
      padding="md"
    >
      <Header loggedIn={loggedIn} toggle={drawerHandlers.toggle} />
      {
      loggedIn && pathname.indexOf('registry') != -1 &&       
        <AppShell.Navbar height={600} p="xs" width={{ base: 300 }}>          
          <NavLink
            onClick={() => {       
              debugger;      
              navigate('/registry/' + akello.selectedRegistry +'/dashboard')
            }}
            label="Dashboard"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          />
          <NavLink
            onClick={() => {              
              navigate('/registry/' + akello.selectedRegistry )
            }}
            label="Registry"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          />
          <NavLink
            onClick={() => {              
              navigate('/registry/' + akello.selectedRegistry + '/team')
            }}
            label="Team"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          />
          <NavLink
            onClick={() => {              
              navigate('/registry/' + akello.selectedRegistry + '/reports')
            }}
            label="Reports"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
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
        loggedIn && (
          <AppShell.Aside p="md">Aside</AppShell.Aside>
        )
      }
      
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );

  if (akello == undefined || akello.accessToken == undefined) {
    return renderAppShell(false);
  }  
  
  return renderAppShell(true);
}