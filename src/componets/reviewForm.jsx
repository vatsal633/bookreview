import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewForm = () => {
  const { bookname } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const BASEURL = import.meta.env.VITE_BACKEND_URL;
  
  

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${BASEURL}/book/getbook/${bookname}`);
        setBook(res.data.book);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      }
    };
    fetchBook();
  }, [bookname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || text.trim() === "") {
      setError("Please provide a rating and a review.");
      return;
    }

    try {
      // Sending the review to the backend
      const username = JSON.parse(localStorage.getItem("token"))
      let user = ''
      if(username){
        user = username.name
      }else{
       user = "Anonymous User";  // Replace this with a real user if needed
      }
      const res = await axios.post(`${BASEURL}/review/${bookname}`, {
        user,
        rating,
        comment: text,
      });

      if (res.status === 201) {
        setSuccessMessage("Review submitted successfully!");
        setRating(0);
        setText("");
        setError("");
      }
    } catch (err) {
      setError("Failed to submit review.");
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* Book Info Section */}
      {book ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-32 h-48 object-cover rounded-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-md text-gray-600 mb-2">by {book.author}</p>
            {book.description && (
              <p className="text-sm text-gray-500">{book.description}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mb-6">Loading book details...</p>
      )}

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Leave a Review</h2>

        {/* Star Rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
