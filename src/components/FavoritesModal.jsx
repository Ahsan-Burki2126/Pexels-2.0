const FavoritesModal = ({ isOpen, onClose, favorites, toggleFavorite }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Your Favorites</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-grow">
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No favorites yet. Start adding some!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={image.src.medium}
                    alt={image.photographer}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(image)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    aria-label="Remove from favorites"
                  >
                    ❤️️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
