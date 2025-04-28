import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [fetchError, setFetchError] = useState(false); // NEW
  const BASEURL = import.meta.env.VITE_BACKEND_URL;


  // this is dummy books this will display if there are no books stored in db or facing some error while fetching books
  const dummyCrimeBooks = [
    {
      _id: "dummy1",
      title: "The Phantom Mystery",
      author: "V.S. Ramachandran Sandra Blakeslee Oliver Sacks",
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409601908i/31555.jpg",
      genre: "crime",
    },
    {
      _id: "dummy2",
      title: "Midnight Shadows",
      author: "Agatha Christie",
      coverImage: "https://via.placeholder.com/300x400?text=Dummy+Book+2",
      genre: "crime",
    },
    {
      _id: "dummy3",
      title: "Secrets of Shadows",
      author: "Emily Stone",
      coverImage: "https://via.placeholder.com/300x400?text=Dummy+Book+3",
      genre: "crime",
    },
  ];

  const dummyFeaturedBooks = [
    {
      _id: "dummyf1",
      title: "Journey to Imagination",
      author: "Luna Sparks",
      coverImage: "https://via.placeholder.com/300x400?text=Featured+Book+1",
      genre: "fiction",
    },
    {
      _id: "dummyf2",
      title: "Dream Beyond Stars",
      author: "Leo Night",
      coverImage: "https://via.placeholder.com/300x400?text=Featured+Book+2",
      genre: "fiction",
    },
    {
      _id: "dummyf3",
      title: "Mystic Horizons",
      author: "Aria Dawn",
      coverImage: "https://via.placeholder.com/300x400?text=Featured+Book+3",
      genre: "fiction",
    },
  ];

  const dummyThrillerBooks = [
    {
      _id: "dummyt1",
      title: "Edge of Reality",
      author: "Noah Blaze",
      coverImage: "https://via.placeholder.com/300x400?text=Thriller+Book+1",
      genre: "thriller",
    },
    {
      _id: "dummyt2",
      title: "Pulse of Shadows",
      author: "Ava Storm",
      coverImage: "https://via.placeholder.com/300x400?text=Thriller+Book+2",
      genre: "thriller",
    },
    {
      _id: "dummyt3",
      title: "Whispers in the Dark",
      author: "Mason Frost",
      coverImage: "https://via.placeholder.com/300x400?text=Thriller+Book+3",
      genre: "thriller",
    },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${BASEURL}/book/getbooks`);
        setBooks(res.data);
        setFetchError(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setFetchError(true); // ERROR DETECTED
      }
    };
    fetchBooks();
  }, []);

  // Filters
  const featured = books.slice(0, 3);
  const crimeBooks = books.filter((book) => book.genre === "crime");
  const thrillerBooks = books.filter((book) => book.genre === "thriller");

  const renderBookCard = (book) => (
    <div
      key={book._id}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4"
    >
      <img
        src={book.coverImage}
        alt={book.title}
        className="h-56 w-full object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
      <p className="text-sm text-gray-600">by {book.author}</p>
      <Link to={`/book/${book.title}`}>
        <button className="mt-4 text-indigo-600 hover:underline text-sm font-medium">
          View Details →
        </button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore top-rated books and share your reviews with the community.
        </p>
        <Link to="/books">
          <button className="bg-white text-indigo-700 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-200 transition">
            Browse Books
          </button>
        </Link>
      </div>

      {/* Featured Books */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-2xl text-center font-bold mb-8 text-gray-800">
          Featured Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(featured.length > 0 && !fetchError
            ? featured
            : dummyFeaturedBooks
          ).map(renderBookCard)}
        </div>
      </section>

      {/* Crime Books */}
      <section className="py-12 px-6 md:px-16">
        <h3 className="text-3xl text-center font-bold mb-8 text-gray-800">
          Crime
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(crimeBooks.length > 0 && !fetchError
            ? crimeBooks
            : dummyCrimeBooks
          ).map(renderBookCard)}
        </div>
      </section>

      {/* Thriller Books */}
      <section className="py-12 px-6 md:px-16">
        <h3 className="text-3xl text-center font-bold mb-8 text-gray-800">
          Thriller
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(thrillerBooks.length > 0 && !fetchError
            ? thrillerBooks
            : dummyThrillerBooks
          ).map(renderBookCard)}
        </div>
      </section>
    </div>
  );
};

export default Home;
