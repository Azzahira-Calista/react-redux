import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="fancy-link">Home</Link></li>
        <li><Link to="/leaderboard" className="fancy-link">Leaderboard</Link></li>
        <li><Link to="/add-thread" className="fancy-link">Buat Thread</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
