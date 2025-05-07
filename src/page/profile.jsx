import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../componets/navbar";

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalreviews, setTotalReviews] = useState(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const BASEURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userResponse = await axios.post(`${BASEURL}/auth/api/${username}/getdata`);
        setEmail(userResponse.data.user.email);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        let reviewResponse = await axios.get(`${BASEURL}/review/${username}`);
        setReviews(reviewResponse.data.reviews);
        setTotalReviews(reviewResponse.data.reviews.length);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    fetchReviews();
  }, [username]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  // ✅ Function to handle edit profile save
  const handleEditProfile = async () => {
    try {
      const response = await axios.put(`${BASEURL}/auth/api/${username}`, {
        newUsername,
        newEmail,
      });

      console.log(response.data);

      // If username updated, redirect to new profile
      if (newUsername && newUsername !== username) {
        navigate(`/profile/${newUsername}`);
      } else {
        if (newEmail) setEmail(newEmail);
      }

      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6 md:p-12">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
          {/* User Info */}
          <div className="flex items-center gap-6 mb-10">
            <img
              src=""
              alt="avatar"
              className="w-24 h-24 rounded-full shadow-md object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
              <p className="text-sm text-gray-500">email: {email}</p>
              <p className="text-sm text-gray-500">Total reviews: {totalreviews}</p>
              <button
                className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Reviews */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">📝 Your Reviews</h3>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
                  >
                    <h4 className="text-md font-semibold text-gray-800">
                      {review.book} <span className="text-yellow-500 ml-2">{"★".repeat(review.rating)}</span>
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews found for this user.</p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-10 text-right">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleEditProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
