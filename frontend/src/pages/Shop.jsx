import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";
import { CustomCSS } from "../components/Custom/CustomCSS";
import { CustomSnippets } from "../components/Custom/CustomSnippets";
import { Container, Toolbar } from "@mui/material";

const Shop = () => {
  const dispatch = useDispatch();

  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = React.useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  React.useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  React.useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    filteredProductsQuery.isLoading,
    dispatch,
    priceFilter,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };
  return (
    <Container maxWidth="lg">
      <div className="flex md:flex-row">
        <div className="bg-green-100 p-3 mt-2 mb-2">
          <h2 className="h4 text-center py-2 bg-green-300 rounded-full mb-2">
            Filter by Categories
          </h2>

          <div className="p-5 w-[20rem]">
            {categories?.map((category) => (
              <div key={category?._id} className="mb-2">
                <div className="flex items-center me-4">
                  <input
                    type="checkbox"
                    id="green-checkbox"
                    onChange={(e) =>
                      handleCheck(e.target.checked, category?._id)
                    }
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-200 focus:ring-1"
                  />

                  <label
                    htmlFor="green-checkbox"
                    className="ms-2 text-sm font-medium"
                  >
                    {category?.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="h4 text-center py-2 bg-green-300 rounded-full mb-2">
            Filter by Brands
          </h2>

          <div className="p-5 w-[20rem]">
            {uniqueBrands.map((brand) => (
              <>
                <div className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    id="green-radio"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-200 focus:ring-1"
                  />

                  <label
                    htmlFor="green-checkbox"
                    className="ms-2 text-sm font-medium"
                  >
                    {brand}
                  </label>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Shop;
