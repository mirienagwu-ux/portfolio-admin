import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Mirien Agwu
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
}
