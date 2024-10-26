import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from '../pages/Start';
import Inventory from '../pages/Inventory';
import Cases from '../pages/Cases';
import Profile from '../pages/Profile';
import Error from '../pages/Error';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/inventory/:id" element={<Inventory />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/profile/:id" element={<Profile />} />
      {/* <Route path="*" element={<Error />} /> */}
    </Routes>
  );
}

export default AppRouter;
