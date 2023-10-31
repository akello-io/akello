import React from 'react';

import { Button } from './Button';
import './header.css';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  logo: React.ReactNode;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({ user, logo, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>
        { logo }
        <h1>akello</h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);
