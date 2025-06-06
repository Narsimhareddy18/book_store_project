import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import API from '../../authentication/Auth';
import EditUserModal from './EditUserTable';
import "../bookPage/Books.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    API.get('/users/')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleDelete = (rowsToDelete = selectedRows) => {
    if (window.confirm('Are you sure to delete selected users?')) {
      rowsToDelete.forEach((row) => {
        API.delete(`/users/${row.id}/`)
          .then(() => {
            setUsers((prev) => prev.filter((user) => user.id !== row.id));
          })
          .catch(() => alert(`Failed to delete user ID ${row.id}`));
      });
    }
  };

  const handleSave = (updatedUser) => {
    API.put(`/users/${updatedUser.id}/`, updatedUser)
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setEditingUser(null);
      })
      .catch(() => alert('Failed to update user'));
  };

const filteredUsers = users.filter(user =>
  (user.name || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  const columns = [
    { name: 'ID', selector: (row) => row.id, width: '60px' },
    { name: 'Username', selector: (row) => row.username, sortable: true },
    // { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Role', selector: (row) => row.role },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className="edit-btn" onClick={() => setEditingUser(row)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete([row])}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="table-wrapper">
      <div className="table-toolbar">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <button
          onClick={handleDelete}
          disabled={!selectedRows.length}
          className="delete-selected-btn"
        >
          Delete Selected
        </button>
      </div>

      <DataTable
        title="👥 User Management"
        columns={columns}
        data={filteredUsers}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        pagination
        highlightOnHover
        striped
        responsive
      />

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default UsersTable;
