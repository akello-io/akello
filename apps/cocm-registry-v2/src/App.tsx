import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import Header from './components/Header';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RegistryPage from './pages/registry/RegistryPage';
import AppHomePage from './pages/AppHomePage';

export default function App() {
  const [opened, drawerHandlers] = useDisclosure({ initialOpened: true });
  const akello = useAkello();
  const navigate = useNavigate();
  
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
      <Route path={"/registry/:registry_id"} element={<RegistryPage />} />
    </Routes>
  )

  const renderAppShell = (loggedIn: boolean) => (
    <AppShell
      className={loggedIn ? '' : 'w-screen'}
      header={{ height: 60 }}
      navbar={{
        width: loggedIn ? 200 : 0,
        breakpoint: 'sm',
        collapsed: {
          desktop: !opened,
          mobile: !opened,
        },
      }}
      padding="md"
    >
      <Header loggedIn={loggedIn} toggle={drawerHandlers.toggle} />
      {loggedIn && <AppShell.Navbar p="md">Navbar</AppShell.Navbar>}
      <AppShell.Main>{loggedIn ? renderPrivateRoutes() : renderPublicRoutes()}</AppShell.Main>
    </AppShell>
  );

  if (akello == undefined || akello.accessToken == undefined) {
    return renderAppShell(false);
  }

  if(akello.getSelectedRegistry() == undefined) {  
    navigate('/')
  }  
  return renderAppShell(true);
}