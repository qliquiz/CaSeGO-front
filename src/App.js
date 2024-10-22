import React from 'react';
import { HashRouter } from 'react-router-dom';
import './styles/App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <AppRouter />
    </HashRouter>
  );
}

export default App;
