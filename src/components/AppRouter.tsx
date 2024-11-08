import { Route, Routes } from 'react-router-dom';
import Start from '../pages/Start';
import Inventory from '../pages/Inventory';
import Cases from '../pages/Roulette';
import Profile from '../pages/Profile';
import Error from '../pages/Error';
import Navbar from './Navbar';
import weapons from '../weapons.json'

const AppRouter = () => {
  const weaponsCount = 100
  const transitionDuration = 10

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/inventory/:id" element={<><Navbar /><Inventory /></>} />
      <Route path="/cases" element={
        <>
          <Navbar />
          <Cases
            weapons={weapons}
            weaponsCount={weaponsCount}
            transitionDuration={transitionDuration}
          />
        </>
      } />
      <Route path="/profile/:id" element={<><Navbar /><Profile /></>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRouter;
