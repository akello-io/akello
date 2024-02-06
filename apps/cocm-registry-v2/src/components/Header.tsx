import { AppShell } from '@mantine/core';
import Logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
const Header = () => {  
  return (
    <AppShell.Header className='flex justify-between px-4'>
      <a href='/' className="flex h-10 w-auto my-auto">
        <img src={Logo} alt="logo" />
      </a>      
      <div className="flex w-auto h-10 my-auto">
        <ThemeToggle />
      </div>      
    </AppShell.Header>
  );
}

export default Header;