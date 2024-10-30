import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Cases from './pages/Cases';
import { UserProvider } from './contexts/UserContext';
import { Route, Routes, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <UserProvider>
  //   <App />
  // </UserProvider>
  <HashRouter>
    <Routes>
      <Route path="/" element={<Cases />} />
    </Routes>
  </HashRouter>
);
