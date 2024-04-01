import { AppShell, Button, UnstyledButton, Text, Burger } from '@mantine/core';

import Logo from '../../../../assets/images/logos/akello/akello-mini-blue.svg';

import { HeaderMenu } from './Menu';
import { useAkello } from "@akello/react-hook";
import { IconUserPlus, IconPlus } from '@tabler/icons-react';
import { ThemeToggle } from '../../../molecules/core';

interface HeaderProps {
  loggedIn: boolean;
  opened: boolean;
  onNavigate: (path: string) => void;
  toggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ loggedIn, opened, onNavigate, toggle }) => {
  const akello = useAkello();


  if (loggedIn) {
    return (
      <AppShell.Header className='flex justify-between px-4'>
        <div className='flex flex-row space-x-3'>
          <Burger
            className='my-auto'
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          >
          </Burger>
          <div
            onClick={() => {
              toggle();
            }}
            className='h-8 w-auto my-auto cursor-pointer'
          >
            <img src={Logo} alt='logo' className='h-8 w-auto' />
          </div>
          <div className='my-auto'>
            <div className='text-xl font-semibold hidden sm:block'>
              {akello.getSelectedRegistry()?.name ?? ''}
            </div>
          </div>
        </div>

        <div className='flex flex-row my-auto space-x-6'>
          {akello.getSelectedRegistry() && (
            <Button
              variant="default"
              leftSection={<IconUserPlus size={14} />}
              onClick={() => {
                const selectedRegistry = akello.getSelectedRegistry();
                if (selectedRegistry) {
                  onNavigate(`/patient-referral`);
                }
              }}
            >
              Refer Patient
            </Button>
          )}

          {!akello.getSelectedRegistry() && (
            <Button
              variant="default"
              leftSection={<IconPlus size={14} />}
              onClick={() => {
                onNavigate('/create-registry');
              }}
            >
              Create Registry
            </Button>
          )}

          <HeaderMenu />
        </div>
      </AppShell.Header>
    );
  }

  return (
    <AppShell.Header className='flex justify-between px-4 my-auto'>
      <UnstyledButton onClick={() => {
        onNavigate('/registry');
      }} className='flex h-10 w-auto my-auto'>
        <img src={Logo} alt='logo' className='h-10 w-auto' />
      </UnstyledButton>
      <div className='flex w-auto h-10 my-auto'>
        <ThemeToggle />
      </div>
    </AppShell.Header>
  );
};
