import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";

const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    coverImage: "",
  });
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); 
  const BASEURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("adminToken"))?.token;
      console.log("Sending token:", token);


      const res = await axios.post(`${BASEURL}/api/admin/verify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAuth(true);
      setLoading(false)
      fetchBooks() 

      console.log("Auth success:", res.data);
    } catch (error) {
      setIsAuth(false)
      console.error("Auth check failed", error.response?.data || error.message);
      // Optionally redirect
      window.location.href = "/login/admin";
    }
  };



  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${BASEURL}/book/getbooks`);
      console.log(res.data)
      setBooks(res.data || []);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editBookId) {
        await axios.put(`${BASEURL}/book/${editBookId}`, formData);
      } else {
        await axios.post(`${BASEURL}/book/add`, formData);
      }

      fetchBooks();
      setFormData({ title: "", author: "", genre: "", description: "", coverImage: "" });
      setEditBookId(null);
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditBookId(book._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASEURL}/book/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if(loading) return <p>Loading...</p>

  return isAuth ?(
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8">📚 Admin Panel</h1>

        {/* Book Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {["title", "author", "genre", "coverImage"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border p-2 rounded-md"
              required={field !== "coverImage"}
            />
          ))}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="md:col-span-2 border p-2 rounded-md"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {editBookId ? "Update Book" : "Add Book"}
          </button>
        </form>

        {/* Book List */}
        <div className="space-y-4">
          {books.length === 0 ? (
            <p className="text-center text-gray-500">No books available</p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="p-4 border rounded-md flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1 space-y-1">
                  <p><span className="font-semibold">Title:</span> {book.title}</p>
                  <p><span className="font-semibold">Author:</span> {book.author}</p>
                  <p><span className="font-semibold">Genre:</span> {book.genre}</p>
                  <p><span className="font-semibold">Description:</span> {book.description}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ):null
};

export default Admin;
