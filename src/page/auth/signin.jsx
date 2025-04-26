import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const [error, setError] = useState("");
  const [success,setSuccess] = useState("")
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_BACKEND_URL

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const formData = { username, email, password }

    try {
      let response = await axios.post(`${BASEURL}/auth/api/${username}/signin`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      setSuccess(response.data.message)
      localStorage.setItem("token", JSON.stringify("yes"))
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {success&&( <p className="text-green-500 text-sm mb-4 text-center">{success}</p>)}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600 ">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            placeholder="your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition"
        >
          SignIn
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Alraedy have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
