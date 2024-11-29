import React from 'react';

interface FavoriteCardProps {
  favorite: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  };
  isHighlighted: boolean;
  onClick: () => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ favorite, isHighlighted, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg shadow-md ${isHighlighted ? 'border-4 border-blue-500' : ''}`}
      role="button"
      aria-label={`Select favorite: ${favorite.title}`}
    >
      <img 
        src={favorite.imageUrl} 
        alt={`Image for ${favorite.title}`} 
        className="w-full h-48 object-cover rounded-lg mb-4" 
      />
      <h3 className="text-xl font-semibold text-gray-900">{favorite.title}</h3>
      <p className="text-gray-600">{favorite.description}</p>
    </div>
  );
};

export default FavoriteCard;
