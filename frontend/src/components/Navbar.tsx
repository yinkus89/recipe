import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-4 text-white">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/favorite" className="hover:text-gray-300">Favorites</Link></li>
        <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
        <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
        <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
