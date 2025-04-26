import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({ title: '', author: '', genre: '', description: '',coverImage:'' });
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const BASEURL = import.meta.env.VITE_BACKEND_URL

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(formData)
    try{
      let response = axios.post(`${BASEURL}/book/add`,formData,{headers: { "Content-Type": "application/json" },})

      console.log(response.data)

    }catch(err){
      console.log(err)
    }

    if (editIndex !== null) {
      // Update
      const updated = [...books];
      updated[editIndex] = formData;
      setBooks(updated);
      setEditIndex(null);
    } else {
      // Add new
      setBooks(prev => [...prev, formData]);
    }

    setFormData({ title: '', author: '', genre: '', description: '' ,coverImage:''});
  };

  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">📚 Admin - Manage Books</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={3}></textarea>
        <input type="text" name="coverImage" placeholder="Image url" value={formData.coverImage} onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {editIndex !== null ? "Update Book" : "Add Book"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">📖 Books</h3>
      {books.length === 0 ? (
        <p className="text-gray-500">No books added yet.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book, index) => (
            <li key={index} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(index)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
