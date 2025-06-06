import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import API from '../../authentication/Auth';
import EditBookModal from './EditBooks';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    API.get('/books/')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleDelete = (rowsToDelete = selectedRows) => {
    if (window.confirm('Are you sure?')) {
      rowsToDelete.forEach((row) => {
        API.delete(`/books/${row.id}/`).then(() => {
          setBooks((prev) => prev.filter((book) => book.id !== row.id));
        });
      });
    }
  };

  const handleSave = (updatedBook) => {
    API.put(`/books/${updatedBook.id}/`, updatedBook).then(() => {
      setBooks((prev) =>
        prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
      setEditingBook(null);
    });
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true, width: '70px' },
    { name: 'Title', selector: (row) => row.title, sortable: true },
    { name: 'Author', selector: (row) => row.author },
    { name: 'Price', selector: (row) => `$${row.price}` },
    { name: 'Published', selector: (row) => row.published_date },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button onClick={() => setEditingBook(row)} className="edit-btn">Edit</button>
          <button onClick={() => handleDelete([row])} className="delete-btn">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="table-wrapper">
      <div className="table-toolbar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleDelete} disabled={!selectedRows.length} className="delete-selected-btn">
          Delete Selected
        </button>
        <button onClick={() => alert('Export')} className="export-btn">
          Export CSV
        </button>
      </div>

      <DataTable
        title="📚 Book Inventory"
        columns={columns}
        data={filteredBooks}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        pagination
        highlightOnHover
        responsive
        striped
      />

      <EditBookModal
        book={editingBook}
        onClose={() => setEditingBook(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Books;
