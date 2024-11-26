// src/components/Footer.tsx
import React from "react";
import "../styles/tailwind.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p className="text-sm">&copy; 2024 Recipe App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
