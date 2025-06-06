import React, { useState, useEffect } from 'react';
import './EditBooks.css';

const EditBookModal = ({ book, onClose, onSave }) => {
  const [form, setForm] = useState({ title: '', author: '', price: '', published_date: '' });

  useEffect(() => {
    if (book) {
      setForm(book);
    }
  }, [book]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Book</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
          <input name="published_date" value={form.published_date} onChange={handleChange} placeholder="YYYY-MM-DD" required />
          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
