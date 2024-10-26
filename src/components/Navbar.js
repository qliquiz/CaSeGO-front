import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="navbar">
      <nav className="navbar-links">
        <Link to={`/inventory/${user.id}`}>Инвентарь</Link>
        <Link to="/cases">Кейсы</Link>
        <Link to={`/profile/${user.id}`}>Профиль</Link>
      </nav>
    </div>
  );
};

export default Navbar;
