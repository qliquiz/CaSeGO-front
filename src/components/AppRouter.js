import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from '../pages/Start';
import Inventory from '../pages/Inventory';
import Cases from '../pages/Cases';
import Profile from '../pages/Profile';
import Error from '../pages/Error';
import Navbar from './Navbar';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/inventory/:id" element={<><Navbar /><Inventory /></>} />
        <Route path="/cases" element={<><Navbar /><Cases /></>} />
        <Route path="/profile/:id" element={<><Navbar /><Profile /></>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default AppRouter;
