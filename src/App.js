import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Books from './components/Books';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      {token && <Navbar token={token} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/books" : "/login"} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/books" element={token ? <Books onLogout={handleLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
