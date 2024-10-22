import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-links">
        <Link to="/inventory">Инвентарь</Link>
        <Link to="/">Кейсы</Link>
        <Link to="/profile">Профиль</Link>
      </nav>
    </div>
  );
};

export default Navbar;
