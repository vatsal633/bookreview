import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";

const BookDetails = () => {
  const { bookname } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState([])
  const [rating,setRating] = useState([])
  const BASEURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${BASEURL}/book/getbook/${bookname}`);
        setBook(res.data.book);

        try {
          const reviewsRes = await axios.get(`${BASEURL}/review/getreview/${bookname}`);
          setReview(reviewsRes.data.reviews);
          setRating(reviewsRes.data.reviews)
          
        } catch (reviewErr) {
          if (reviewErr.response && reviewErr.response.status === 404) {
            setReview([]); 
          } else {
            setError("Failed to load reviews");
          }
        }

      } catch (err) {

        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookname]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!book) return <div className="p-8">Book not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full md:w-56 rounded-xl object-cover shadow"
            />
            <button className="border rounded-lg p-2 mt-2 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white">
              Buy on Amazon
            </button>
            <Link to={`/${bookname}/review`}>
              <button className="border rounded-lg p-2 mt-2 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white flex items-center gap-2">
                <FaPencil /> Add your Review
              </button>
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600">by {book.author}</p>
            <p className="mt-2 text-sm text-indigo-600 font-medium">
              Genre: {book.genre}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-gray-800 text-lg font-semibold">
                {book.rating} / 5
              </span>
            </div>
            <p className="mt-6 text-gray-700 leading-relaxed">
              {book.description}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 User Reviews</h2>
          {review.length > 0 ? (
            <div className="space-y-6">
              {review.map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-700">{review.user}</span>
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p> {/* comment not text */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
