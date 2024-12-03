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
      className={`cursor-pointer p-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${isHighlighted ? 'border-4 border-blue-500' : ''}`}
      role="button"
      aria-label={`Select favorite: ${favorite.title}`}
      tabIndex={0} // Allowing keyboard navigation
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          onClick();
        }
      }}
    >
      <img
        src={favorite.imageUrl || '/default-image.jpg'} // Fallback to default image if URL is missing
        alt={`Image of ${favorite.title}`} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900">{favorite.title}</h3>
      <p className="text-gray-600">{favorite.description || 'No description available'}</p>
    </div>
  );
};

export default FavoriteCard;
