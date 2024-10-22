import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inventory from '../pages/Inventory';
import Cases from '../pages/Cases';
import Profile from '../pages/Profile'; 
import Error from '../pages/Error';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/CaSeGO-front/inventory/:id" element={<Inventory />} />
      <Route path="/CaSeGO-front/" element={<Cases />} />
      <Route path="/CaSeGO-front/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRouter;
