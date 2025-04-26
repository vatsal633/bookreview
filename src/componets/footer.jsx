import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-16 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400"> BookVerse</h3>
          <p className="text-sm mt-2 text-gray-400">
            Your ultimate book discovery and review platform.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <Link to="/" className="text-sm text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/books" className="text-sm text-gray-300 hover:text-white">
            Browse Books
          </Link>
          <Link to="/profile" className="text-sm text-gray-300 hover:text-white">
            My Profile
          </Link>
        </div>

        {/* Social or Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Connect</h4>
          <p className="text-sm text-gray-400">Email: support@bookverse.com</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
