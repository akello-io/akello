import LoginPage from './pages/LoginPage';  
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook"
import { Routes, Route, Navigate } from "react-router-dom";


export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const akello = useAkello()   

  if(akello == undefined || akello.accessToken == undefined) {  
    return (
      <>              
        <Routes>              
            <Route path={"/"} element={<LandingPage />} />        
            <Route path={"/confirm"} element={<SignUpConfirm />} />        
            <Route path={"/login"} element={<LoginPage/>} />        
            <Route path={"/signup"} element={<SignUpPage/>} />        
            <Route path={"*"} element={<Navigate to="/login" />} />                    
        </Routes>          
      </>
    )      
  }
  return (    
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
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>    
  );
}