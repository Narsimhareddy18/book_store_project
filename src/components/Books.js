import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Books({ onLogout }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/books/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setBooks(response.data))
    .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Available Books</h2>
      <button onClick={onLogout} style={{ float: 'right' }}>Logout</button>
      <ul>
        {books.map(book => (
          <li key={book.id}><strong>{book.title}</strong> — {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default Books;