import React from 'react';
import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react';



debugger;
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_APP_CLIENT_ID,
      userPoolId: import.meta.env.VITE_AWS_COGNITO_USERPOOL_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_AWS_COGNITO_OAUTH_DOMAIN,
          providers: ['Google'],
          scopes: ["phone", "email", "profile", "openid"],
          responseType: 'code',
          redirectSignIn: [
            import.meta.env.VITE_AWS_COGNITO_SIGNIN_URL,
          ],
          redirectSignOut: [
            import.meta.env.VITE_AWS_COGNITO_SIGNOUT_URL,
          ],
        },
        email: true,
      }
    }
  }
});


const theme = {
  name: 'custom-theme',
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        components: {
          authenticator: {
            modal: {
              background: {
                color: 'rgba(28,25,23,1)',
              }
            }
          },
          tabs: {
            item: {
              active: {
                color: '{colors.black}',
                border: {
                  color: '{colors.black}',
                }
              }
            }
          },
          button: {
            primary: {
              background: {
                color: '{colors.black}',
              }
            }
          }
        },
      },
    },
  ],
};

const App = () => {
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
      <div className="App">
        <header className="App-header">
          Test
        </header>
      </div>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}


