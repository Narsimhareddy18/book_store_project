import React, { useState, useEffect } from 'react';
import "../bookPage/EditBooks.css";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({ username: '', email: '', role: '' });

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
