import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Mirien Agwu
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/admin">Admin Dashboard</Link>}
        {isAuthenticated ? (
          <>
            {user?.firstname && <span style={{ color: '#cbd5e0' }}>Hi, {user.firstname}</span>}
            <a href="#" onClick={(e) => { e.preventDefault(); handleSignOut(); }}>
              Sign Out
            </a>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
