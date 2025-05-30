import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#4CAF50', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h3>📚 BookStore</h3>
      <div>
        <Link to="/books" style={{ marginRight: '1rem', color: 'white' }}>Books</Link>
        <button onClick={handleLogout} style={{ background: 'white', color: '#4CAF50', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;