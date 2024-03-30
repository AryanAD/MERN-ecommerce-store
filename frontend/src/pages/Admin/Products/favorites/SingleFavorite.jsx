import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../../../redux/features/favorites/favoriteSlice";
import Product from "../Product";
import { CustomCSS } from "../../../../components/Custom/CustomCSS";
import { CustomSnippets } from "../../../../components/Custom/CustomSnippets";
import { Container, Toolbar } from "@mui/material";

const SingleFavorite = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <Container maxWidth="xl">
      <Toolbar />

      {CustomSnippets.Heading({
        heading: `Favorite Products`,
      })}

      <div className="flex flex-wrap justify-around gap-6">
        {favorites.map((product) => (
          <div key={product?._id} className="w-[25%]">
            <Product key={product?._id} product={product} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SingleFavorite;
