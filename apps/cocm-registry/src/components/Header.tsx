import { AppShell, UnstyledButton } from '@mantine/core';
import Logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import HeaderMenu from './Menu';
import { useNavigate } from 'react-router-dom';
import { useAkello } from "@akello/react-hook";

interface HeaderProps {
  loggedIn: boolean;
  toggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedIn, toggle }) => {
  const navigate = useNavigate();
  const akello = useAkello();

  if (loggedIn) {
    return (
      <AppShell.Header className='flex justify-between px-4'>
        <div className='flex flex-row space-x-3'>
          <UnstyledButton
            onClick={() => {
              akello.selectRegistry('');
              navigate('/');
            }}
            className='flex h-6 w-auto my-auto'
          >
            <img src={Logo} alt='logo' className='h-6 w-auto' />
          </UnstyledButton>
          <div className='text-xl font-bold my-auto'>
            {akello.getSelectedRegistry() ? akello.getSelectedRegistry().name : ''}            
          </div>
        </div>
        <div className='flex flex-row my-auto space-x-6'>
          {akello.getSelectedRegistry() && (
            <div
              className='btn btn-secondary btn-sm text-white rounded-xl my-auto'
              onClick={() => {
                navigate(`/registry/${akello.getSelectedRegistry().id}/patient-referral`);
              }}
            >
              Add Patient
            </div>
          )}

          {!akello.getSelectedRegistry() && (
            <button
              className='btn btn-secondary text-white btn-sm rounded-xl my-auto'
              onClick={() => {
                navigate('/create-registry');
              }}
            >
              Create Registry              
            </button>
          )}

          <HeaderMenu />
        </div>
      </AppShell.Header>
    );
  }

  return (
    <AppShell.Header className='flex justify-between px-4 my-auto'>
      <UnstyledButton onClick={() => {}} className='flex h-10 w-auto my-auto'>
        <img src={Logo} alt='logo' className='h-10 w-auto' />
      </UnstyledButton>
      <div className='flex w-auto h-10 my-auto'>
        <ThemeToggle />
      </div>
    </AppShell.Header>
  );
};

export default Header;