import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import './styles/App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useUser } from './contexts/UserContext';

function App() {
  const { setUserId } = useUser();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram?.WebApp.ready();
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (telegramUser) {
        console.log('ID: ', telegramUser.id);
        setUserId(telegramUser.id);
      }
    } else {
      console.error('Telegram WebApp не доступен');
    }
  }, [setUserId]);

  return (
    <HashRouter>
      <Navbar />
      <AppRouter />
    </HashRouter>
  );
}

export default App;
