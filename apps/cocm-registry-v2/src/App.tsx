import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAkello } from "@akello/react-hook"
import {
  RouterProvider,
  Routes,
  Route,
  useNavigate,
  createBrowserRouter,
  BrowserRouter,
  Navigate
} from "react-router-dom";
import { publicRoutes } from './routes';
import LoginPage from './pages/LoginPage';  
import { useEffect } from 'react';



export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const akello = useAkello()   
  const navigate = useNavigate()  

  if(akello == undefined || akello.accessToken == undefined) {  
    return (
      <>        
          <Routes>
              <Route path={"/"} element={<div>test</div>} />
              <Route path={"/login"} element={<LoginPage/>} />              
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