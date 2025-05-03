const ImageGrid = ({ images, favorites, toggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={image.src.medium}
            alt={image.photographer}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <p className="text-white text-sm">{image.photographer}</p>
          </div>
          <button
            onClick={() => toggleFavorite(image)}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            aria-label={
              favorites.some((fav) => fav.id === image.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            ❤️{favorites.some((fav) => fav.id === image.id) ? "️" : "️"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
