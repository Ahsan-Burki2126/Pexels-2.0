import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import Footer from "./components/Footer";
import FavoritesModal from "./components/FavoritesModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);

  const API_KEY =
    import.meta.env.VITE_PEXELS_API_KEY ||
    "OIMLNYACLsIhLIhpRdDkdXn3cnA5zi8kW6QtWk2MYt0OF4DNT4OONzL5";

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        query
          ? `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}`
          : `https://api.pexels.com/v1/curated?per_page=15&page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const data = await response.json();
      setImages(data.photos || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
  };

  const toggleFavorite = (image) => {
    if (favorites.some((fav) => fav.id === image.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== image.id));
    } else {
      setFavorites([...favorites, image]);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Pexels Image Gallery
        </h1>

        <SearchBar onSearch={handleSearch} />

        <button
          onClick={() => setShowFavorites(true)}
          className="fixed right-4 bottom-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
        >
          <span className="mr-2">❤️</span>
          <span>{favorites.length}</span>
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <ImageGrid
              images={images}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Load More
              </button>
            </div>
          </>
        )}
      </div>

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Footer />
    </div>
  );
}

export default App;
