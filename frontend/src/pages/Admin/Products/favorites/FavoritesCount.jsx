import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;

  return (
    <div className="absolute left-5 top-8">
      {favoritesCount > 0 && (
        <span className="px-1 py-0 text-sm bg-green-500 rounded-full">
          {favoritesCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
