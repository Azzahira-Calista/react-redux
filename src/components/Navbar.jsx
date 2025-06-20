import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="fancy-link">Home</Link></li>
        <li><Link to="/leaderboard" className="fancy-link">Leaderboard</Link></li>
        <li><Link to="/add-thread" className="fancy-link">Buat Thread</Link></li>
        <LogoutButton />
      </ul>
    </nav>
  );
}

export default Navbar;
