import React, { useState, useEffect, useRef } from 'react';

function Navbar({ handleLogout }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const hide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener('mousedown', hide);
    return () => document.removeEventListener('mousedown', hide);
  }, []);

  return (
    <nav style={{ background: '#4CAF50', padding: '0.1rem', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h3>📚 Book Store</h3>
      <div ref={ref}>
        <div onClick={() => setShow(!show)} style={{ cursor: 'pointer', background: 'white', color: '#4CAF50', padding: '5px 5px', borderRadius: '50px' }}>
          👤 Profile
        </div>
        {show && (
          <div style={{ background: 'white', color: '#4CAF50', boxShadow: '0 0 5px rgba(0,0,0,0.2)', borderRadius: '50px' }}>
            <button onClick={handleLogout} style={{cursor: 'pointer',border: 'none', background: 'white', color: '#4CAF50', padding: '5px 5px', borderRadius: '50px' }}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
