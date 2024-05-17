import {
  ReportsPage,
  RegistrySecurityPage,
  ReferPatientStepper,
  PatientReferralPage,
  RegistryShell,
  UserAccountShell,
  RegistryCollectionShell,
  NothingFoundBackground,
  ChangePasswordPage,
  PaymentCompleted,
  MeasurementsPage,
} from '@akello/react';
import { Registry } from '@akello/core';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom'
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { RegistryPage } from '@akello/react';
import { AkelloClient } from '@akello/client';
import './App.css';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { useAkello } from '@akello/react-hook';



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

async function currentSession(akello: AkelloClient) {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

    akello.setAccessToken(accessToken?.toString())

    akello.setProfileInfo(
      idToken!.payload.given_name,
      idToken!.payload.family_name,
      idToken!.payload.picture,
      idToken!.payload.email
    )

  } catch (err) {
    console.log(err);
  }
}

const App = () => {
  const [tokenLoaded, setTokenLoaded] = React.useState(false);
  const [themeMode, setThemeMode] = useState('');
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const { pathname } = useLocation();
  const akello = useAkello();
  const navigate = useNavigate();
  const patient_id = akello.getSelectedPatientRegistry()?.id;


  useEffect(() => {
    currentSession(akello).then(() => {
      setTokenLoaded(true)
    })
  })

  useEffect(() => {
    if(!tokenLoaded) {
      return;
    }
    akello.userService.getUser((data: any) => {

      akello.registryService.getRegistry(data.selected_registry.registry_id, (registry_data: any) => {
          const registry = new Registry(registry_data.id, registry_data.organization_id, registry_data.name, registry_data.logo)
          akello.selectRegistry(registry);
          akello.dispatchEvent({ type: 'change' });


      }, (error: any) => {
          console.log(error)
      })
    })
  }, [tokenLoaded])



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



  if(!tokenLoaded) {
    return <></>
  }


  if(authStatus === 'configuring') {
    return <></>
  }

  if(authStatus !== 'authenticated') {
    return <>not authenticated</>
  }

  return (
    <ThemeProvider theme={theme} colorMode={themeMode}>
      <Routes>
          <Route path="/" element={
                    <>
                       <UserAccountShell
                        navigate={navigate}
                        pathname={pathname}
                        Outlet={Outlet}
                        signOut={() => {}}
                        stripe_checkout_url={import.meta.env.VITE_STRIPE_CHECKOUT_URL}
                        stripe_portal_url={import.meta.env.VITE_STRIPE_CUSTOMER_PORTAL}
                      />
                    </>}>
                    <Route index element={<RegistryPage drawerHandlers={() => {}} onNavigate={(path: string) => navigate(path)} patient_id={patient_id} />} />
            </Route>
      </Routes>
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


