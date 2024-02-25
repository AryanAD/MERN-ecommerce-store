import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { CustomCSS } from "../../components/CustomCSS";
import { CustomSnippets } from "../../components/CustomSnippets";
import Container from "@mui/material/Container";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("image", image);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed, Try Again.");
      } else {
        toast.success(`${data.name} is created.`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed, Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Container maxWidth="xl">
      {CustomSnippets.Heading({ heading: "Manage Products" })}
      {imageUrl && (
        <div className="text-center">
          <img
            src={imageUrl}
            alt="productImage"
            className="block mx-auto max-h-[200px] rounded-md mb-5"
          />
        </div>
      )}

      <div className={`mb-3 ${imageUrl ? "hidden" : ""}`}>
        <label className={CustomCSS.bigImageLabel}>
          {image ? image.name : "Upload Image"}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            className="hidden"
          />
        </label>
      </div>

      <div className={CustomCSS.gridTwo}>
        <div>
          <label className={CustomCSS.inputLabel}>Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter Product Name"
            onChange={(e) => setName(e.target.value)}
            className={CustomCSS.inputField}
          />
        </div>
        <div>
          <label className={CustomCSS.inputLabel}>Price</label>
          <input
            type="number"
            value={price}
            placeholder="Enter Product Price"
            onChange={(e) => setPrice(e.target.value)}
            className={CustomCSS.inputField}
          />
        </div>
        <div>
          <label className={CustomCSS.inputLabel}>Quantity</label>
          <input
            type="number"
            value={quantity}
            placeholder="Enter Product Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            className={CustomCSS.inputField}
          />
        </div>
        <div>
          <label className={CustomCSS.inputLabel}>Brand</label>
          <input
            type="text"
            value={brand}
            placeholder="Enter Brand Name"
            onChange={(e) => setBrand(e.target.value)}
            className={CustomCSS.inputField}
          />
        </div>

        <div className="col-span-full">
          <label className={CustomCSS.inputLabel}>Description</label>
          <textarea
            type="text"
            value={description}
            placeholder="Enter Product Description"
            onChange={(e) => setDescription(e.target.value)}
            className={CustomCSS.inputField}
          ></textarea>
        </div>

        <div>
          <label className={CustomCSS.inputLabel}>Quantity In Stock</label>
          <input
            type="number"
            value={stock}
            placeholder="Enter Stock Count"
            onChange={(e) => setStock(e.target.value)}
            className={CustomCSS.inputField}
          />
        </div>

        <div>
          <label className={CustomCSS.inputLabel}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={CustomCSS.inputField}
          >
            <option>Select Category</option>
            {categories?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={CustomCSS.buttonContainer}>
        <button onClick={handleSubmit} className={CustomCSS.buttonSubmit}>
          Submit
        </button>
      </div>
    </Container>
  );
};

export default ProductList;
