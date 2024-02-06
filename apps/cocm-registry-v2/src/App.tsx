import LoginPage from './pages/LoginPage';  
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignUpConfirm from './pages/SignUpConfirm';
import Header from './components/Header';
import { AppShell, Burger, Center, Box, Group, Title, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook"
import { Routes, Route, Navigate } from "react-router-dom";


export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const akello = useAkello()   

  if(akello == undefined || akello.accessToken == undefined) {  
    return (
      <AppShell
          className='w-screen'
          header={{ height: 60 }}
          navbar={{
            width: 0,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
      <Header />      
      <AppShell.Main>        
        <div className="flex">
          <div className="m-auto">
            <Routes>              
                <Route path={"/confirm"} element={<SignUpConfirm />} />        
                <Route path={"/login"} element={<LoginPage/>} />        
                <Route path={"/signup"} element={<SignUpPage/>} />        
                <Route path={"*"} element={<Navigate to="/login" />} />                    
            </Routes>                    
          </div>
        </div>        
      </AppShell.Main>
    </AppShell>          
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