import { AppShell, UnstyledButton } from '@mantine/core';
import Logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import { useDisclosure } from '@mantine/hooks';


interface HeaderProps {
  loggedIn: boolean 
  toggle: () => void
}

const Header:React.FC<HeaderProps> = ({loggedIn, toggle}) => {  

  if(loggedIn) {
    return (
      <AppShell.Header className='flex justify-between px-4'>
        <UnstyledButton onClick={() => {          
          toggle()
        }} className="flex h-10 w-auto my-auto">
          <img src={Logo} alt="logo" className="h-10 w-auto " />
        </UnstyledButton>      
        <div className="flex w-auto h-10 my-auto">
          <ThemeToggle />
        </div>      
      </AppShell.Header>
    );
  }
  return (
    <AppShell.Header className='flex justify-between px-4'>
        <UnstyledButton onClick={() => toggle()} className="flex h-10 w-auto my-auto">
          <img src={Logo} alt="logo" className="h-10 w-auto " />
        </UnstyledButton>      
        <div className="flex w-auto h-10 my-auto">
          <ThemeToggle />
        </div>      
      </AppShell.Header>    
  )
  
}

export default Header;