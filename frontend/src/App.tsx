import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import UserProfile from './pages/UserProfile';
import RecipeList from './components/RecipeList';
import EditRecipePage from './pages/EditRecipePage'; // Import EditRecipePage
import RecipeDetails from './pages/RecipeDetails'; // Import RecipeDetails for individual recipe page
import Header from './components/Header';
import CreateRecipe from './pages/CreateRecipe';
import './styles/tailwind.css';

const App: React.FC = () => {
  return (
    <Router>
      {/* Header and Navbar are displayed on all pages */}
      <Header />
      <Navbar />

      <div className="container mx-auto my-4">
        <Routes>
          {/* Route definitions */}
          <Route path="/" element={<HomePage />} />
          <Route path="create-recipe"element={<CreateRecipe/>}/>
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/edit-recipe/:id" element={<EditRecipePage />} /> {/* Edit Recipe */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />


        </Routes>
      </div>

      {/* Footer is displayed on all pages */}
      <Footer />
    </Router>
  );
};

export default App;
