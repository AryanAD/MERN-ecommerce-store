import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params?._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [name, setName] = useState(productData?.name || "");
  const [image, setImage] = useState(productData?.image || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [stockQuantity, setStockQuantity] = useState(
    productData?.countInStock || ""
  );

  useEffect(() => {
    if (productData && productData?._id) {
      setName(productData?.name);
      setImage(productData?.image);
      setPrice(productData?.price);
      setBrand(productData?.brand);
      setQuantity(productData?.quantity);
      setCategory(productData?.categories?._id);
      setDescription(productData?.description);
      //   setStockQuantity(productData?.countInStock);
    }
  }, [productData]);

  return <div>UpdateProduct</div>;
};

export default UpdateProduct;
