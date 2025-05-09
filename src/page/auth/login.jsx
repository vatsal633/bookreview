import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess] = useState(false)
  const BASEURL = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const formData = { username, password }

      let response = await axios.post(`${BASEURL}/auth/api/${username}/login`, formData, { headers: { "Content-Type": "application/json" } })

      
      if(response.status===200){
        setSuccess(true)
        navigate(`/${username}/profile`)
        setError("");
      }
      let token = response.data.token
      localStorage.setItem("token", JSON.stringify({name:username,token}))
      // console.log(formData)

    } catch (err) {
      setSuccess(false)
      setError(err.response.data.message)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Log In</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {success&&(<p className="text-green-500 text-sm mb-4 text-center">
          Login sucessfully!Redirecting you
        </p>)}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Log In
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account? <a href="/signin" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
