import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { theme } from './theme';
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react';



interface AppProps {
  isPassedToWithAuthenticator: boolean;
}

const App:React.FC<AppProps> = () => {
  const [themeMode, setThemeMode] = useState('');
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeMode('dark');
    }

    const handleChangeTheme = (event: MediaQueryListEvent) => {
      setThemeMode(event.matches ? "dark" : "light");
    };

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryList.addEventListener('change', handleChangeTheme);

    return () => {
      mediaQueryList.removeEventListener('change', handleChangeTheme);
    };
  }, []);

  if(authStatus === 'configuring') {
    return <></>
  }

  if(authStatus !== 'authenticated') {
    return <>not authenticated</>
  }

  return (
    <ThemeProvider theme={theme} colorMode={themeMode}>
      <Routes>
          <Route path="/" element={<>root</>} />
      </Routes>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);

