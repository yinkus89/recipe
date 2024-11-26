// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetails from './components/RecipeDetails';
import FavoriteList from './components/FavoriteList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FavoritePage from './pages/FavoritePage';
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/favorites" element={<FavoritePage />} /> {/* Route to FavoritePage */}
        {/* Other routes */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
