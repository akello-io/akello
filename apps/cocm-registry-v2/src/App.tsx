import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import Header from './components/Header';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const akello = useAkello();

  const renderRoutes = () => (
    <Routes>
      <Route path={"/confirm"} element={<SignUpConfirm />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/signup"} element={<SignUpPage />} />
      <Route path={"*"} element={<Navigate to="/login" />} />
    </Routes>
  );

  const renderAppShell = (loggedIn: boolean) => (
    <AppShell
      className={loggedIn ? '' : 'w-screen'}
      header={{ height: 60 }}
      navbar={{
        width: loggedIn ? 300 : 0,
        breakpoint: 'sm',
        collapsed: {
          desktop: !opened,
          mobile: !opened,
        },
      }}
      padding="md"
    >
      <Header loggedIn={loggedIn} toggle={toggle} />
      {loggedIn && <AppShell.Navbar p="md">Navbar</AppShell.Navbar>}
      <AppShell.Main>{loggedIn ? 'Main' : renderRoutes()}</AppShell.Main>
    </AppShell>
  );

  if (akello == undefined || akello.accessToken == undefined) {
    return renderAppShell(false);
  }

  return renderAppShell(true);
}