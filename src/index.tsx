import ReactDOM from 'react-dom/client';
import './styles/reset.scss';
/* import App from './App';
import { UserProvider } from './contexts/UserContext'; */

import './styles/App.scss';
import Cases from './pages/Cases';

const weaponsCount = 100;
const transitionDuration = 10;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <UserProvider>
  //   <App />
  // </UserProvider>
  <div className='App'>
    <Cases
      weaponsCount={weaponsCount}
      transitionDuration={transitionDuration}
    />
  </div>
);
