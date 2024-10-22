import { Link, useParams } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const { id } = useParams();

  return (
    <div className="navbar">
      <nav className="navbar-links">
        <Link to={`/CaSeGO-front/inventory/${id}`}>Инвентарь</Link>
        <Link to="/CaSeGO-front/">Кейсы</Link>
        <Link to="/CaSeGO-front/profile">Профиль</Link>
      </nav>
    </div>
  );
};

export default Navbar;
