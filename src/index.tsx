import ReactDOM from 'react-dom/client';
import './styles/reset.scss';
import App from './App';
import { UserProvider } from './contexts/UserContext';

/* import './styles/App.scss';
import Cases from './pages/Cases';
import weapons from './weapons.json';

const weaponsCount = 100;
const transitionDuration = 10; */

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
  // <div className='App'>
  //   <Cases
  //     weapons={weapons}
  //     weaponsCount={weaponsCount}
  //     transitionDuration={transitionDuration}
  //   />
  // </div>
);
