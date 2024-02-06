import React, { useContext } from 'react';
import { ActionIcon } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import ColorSchemeContext from '../ColorSchemeContext';

const ThemeToggle = () => { 
  const { setColorScheme, clearColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => setColorScheme(dark ? 'light' : 'dark')}
      title="Toggle color scheme"
    >
      {dark ? (
        <SunIcon style={{ width: 18, height: 18 }} />
      ) : (
        <MoonIcon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}

export default ThemeToggle;