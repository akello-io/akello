import { AkelloClient } from '@akello/core';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { reactContext } from './AkelloProvider.context';

export interface AkelloProviderProps {
  readonly akello: AkelloClient;
  readonly children: ReactNode;
}


export const AkelloProvider = (props: AkelloProviderProps): JSX.Element => {
  const akello = props.akello;
  
  const [state, setState] = useState({ 
    loading: false,
    isAuthenticated: akello.accessToken !== undefined,
    username: akello.getUserName()
  });

  useEffect(() => {
    const eventListener = (): void => {      
      console.log('--------------EVENT LISTENER----------------------')
      console.log("akello.accessToken: " + akello.accessToken)
      
      setState({
        ...state,
        isAuthenticated: akello.accessToken !== undefined,
        username: akello.getUserName()
      });
    }

    akello.addEventListener('change', eventListener);
    return () => akello.removeEventListener('change', eventListener);
  }, [akello, state]);
  

  useEffect(() => {
    console.log("state.isAuthenticated: " + state.isAuthenticated)
  }, [state.isAuthenticated]);


  const akelloContext = useMemo(
    () => ({
      ...state,
      akello,
    }),
    [state, akello]
  );

  return <reactContext.Provider value={akelloContext}>{props.children}</reactContext.Provider>;
}
