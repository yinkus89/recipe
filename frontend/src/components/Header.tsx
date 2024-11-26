import React from 'react';
import "../styles/tailwind.css";

const Header: React.FC = () => (
  <header className="bg-blue-600 text-white py-4 shadow-md">
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold">Recipe App</h1>
    </div>
  </header>
);

export default Header;

