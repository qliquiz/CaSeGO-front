import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useUser, User } from './contexts/UserContext';
import './styles/App.scss';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initDataUnsafe?: {
          user?: User;
        };
      };
    };
  }
}

const App: React.FC = () => {
  const { setUser } = useUser();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (telegramUser) {
        console.log('ID: ', telegramUser.id);
        setUser(telegramUser);
      }
    } else console.error('Telegram WebApp не доступен');
  }, [setUser]);

  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};

export default App;
