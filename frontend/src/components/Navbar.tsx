import React from "react";
import { Link } from "react-router-dom";
import "../styles/tailwind.css";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Recipe App</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-blue-400">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
