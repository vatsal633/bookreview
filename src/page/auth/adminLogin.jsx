import React, { useState } from "react";
import axios from "axios"

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const BASEURL = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await axios.post(`${BASEURL}/api/admin/login`, formData);
            if (res.status === 200) {
                setMessage("Login successful!");
                const authToken = res.data.token//extract the token 

                //storing the token
                localStorage.setItem("adminToken", JSON.stringify(authToken));
                window.location.href = "/admin";
            } else {
                setMessage("Login failed");
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setMessage(err.response.data.message);
            }

            if (err.response && err.response.status === 401) {
                setMessage(err.response.data.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>

                {message && (
                    <div className="mb-4 text-sm text-red-600 text-center">{message}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
