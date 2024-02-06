import { AppShell, UnstyledButton, Group, Stack, Text } from '@mantine/core';
import Logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';
import HeaderMenu from './Menu';
import { useNavigate } from 'react-router-dom';
import { useAkello } from "@akello/react-hook";

interface HeaderProps {
  loggedIn: boolean 
  toggle: () => void
}

const Header:React.FC<HeaderProps> = ({loggedIn, toggle}) => {  
  const navigate = useNavigate()
  const akello = useAkello()
  if(loggedIn) {
    return (
      <AppShell.Header className='flex justify-between px-4'>
        <div className='flex flex-row space-x-3'>
          <UnstyledButton onClick={() => {          
            akello.selectRegistry('')
            navigate('/')
          }} className="flex h-6 w-auto my-auto">
            <img src={Logo} alt="logo" className="h-6 w-auto"/>
          </UnstyledButton>      
          <div className='text-xl font-bold my-auto'>Registry Name</div>
        </div>        
        <div className='flex flex-row'>
          <HeaderMenu />
          <div className="flex w-auto h-10">            
          </div>          
        </div>
      </AppShell.Header>
    );
  }
  return (
    <AppShell.Header className='flex justify-between px-4 my-auto'>
        <UnstyledButton onClick={() => {}} className="flex h-10 w-auto my-auto">
          <img src={Logo} alt="logo" className="h-10 w-auto " />
        </UnstyledButton>      
        <div className="flex w-auto h-10 my-auto">
          <ThemeToggle />
        </div>      
      </AppShell.Header>    
  )
  
}

export default Header;