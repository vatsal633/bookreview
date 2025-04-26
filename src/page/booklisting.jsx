import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const BookListingPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const navigate = useNavigate()
  const BASEURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${BASEURL}/book/getbooks`);
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre ? book.genre === genre : true;
    const matchesRating = ratingFilter ? book.rating >= parseFloat(ratingFilter) : true;
    return matchesSearch && matchesGenre && matchesRating;
  });

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>

      <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="romance">Romance</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4">4★ and above</option>
          <option value="3">3★ and above</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-yellow-500">★ {book.rating}</p>

            <Link to={`/book/${book.title}`}>
              <button className="mt-4 text-indigo-600 hover:underline text-sm font-medium cursor-pointer">
                View Details →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListingPage;
