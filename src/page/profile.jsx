import React from "react";
import { useParams ,Link} from "react-router-dom";
const user = {
  favoriteBooks: [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://example.com/alchemist.jpg",
    },
  ],
  reviews: [
    {
      bookTitle: "Atomic Habits",
      rating: 5,
      text: "Incredible read! Changed my habit game.",
    },
    {
      bookTitle: "Deep Work",
      rating: 4,
      text: "Great insights, a bit dense though.",
    },
  ],
};

const UserProfile = () => {

  const {username} = useParams()

  
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        {/* User Info */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src=''
            alt="avatar"
            className="w-24 h-24 rounded-full shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
            <p className="text-sm text-gray-500">email</p>
            <button className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Favorite Books */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">📚 Favorite Books</h3>
          <div className="flex gap-4 overflow-x-auto">
            {user.favoriteBooks.map((book) => (
              <div key={book.id} className="w-32">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="rounded-lg shadow"
                />
                <p className="mt-2 text-sm font-medium text-gray-700">{book.title}</p>
                <p className="text-xs text-gray-500">{book.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Reviews */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">📝 Your Reviews</h3>
          <div className="space-y-4">
            {user.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <h4 className="text-md font-semibold text-gray-800">
                  {review.bookTitle} <span className="text-yellow-500 ml-2">{"★".repeat(review.rating)}</span>
                </h4>
                <p className="text-gray-600 text-sm mt-1">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-10 text-right">
          <Link to={'/login'}>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
            Logout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
