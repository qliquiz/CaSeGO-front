import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Start from './pages/Start';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useUser } from './contexts/UserContext';

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram?.WebApp.ready();
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (telegramUser) {
        console.log('ID: ', telegramUser.id);
        setUser(telegramUser);
      }
    } else {
      console.error('Telegram WebApp не доступен');
    }
  }, [setUser]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
      <AppRouter/>
        <Navbar />
    </HashRouter>
  );
}

export default App;
