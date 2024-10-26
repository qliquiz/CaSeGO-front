import { Link, useParams } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const { id } = useParams();

  return (
    <div className="navbar">
      <nav className="navbar-links">
        <Link to={`/inventory/${id || ''}`}>Инвентарь</Link>
        <Link to="/cases">Кейсы</Link>
        <Link to={`/profile/${id || ''}`}>Профиль</Link>
      </nav>
    </div>
  );
};

export default Navbar;
