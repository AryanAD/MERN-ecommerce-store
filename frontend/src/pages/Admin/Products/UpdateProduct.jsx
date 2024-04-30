import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import { useFetchCategoriesQuery } from "../../../redux/api/categoryApiSlice";
import { CustomCSS } from "../../../components/Custom/CustomCSS";
import { Container, Toolbar } from "@mui/material";
import AdminMenu from "../AdminMenu";
import { CustomSnippets } from "../../../components/Custom/CustomSnippets";
import { toast } from "react-toastify";

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
  const [countInStock, setCountInStock] = useState(
    productData?.countInStock || ""
  );
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [description, setDescription] = useState(
    productData?.description || ""
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
      setCountInStock(productData?.countInStock);
    }
  }, [productData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", countInStock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/all-products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure to delete this product?");

      if (!answer) return;

      const { data } = await deleteProduct(params?._id);
      toast.success(`${data.name} has been deleted.`);
      navigate("/admin/all-products");
    } catch (error) {
      console.error(error);
      toast.error("Product deletion failed. Try again.");
    }
  };

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl">
      {CustomSnippets.Heading({ heading: "Manage Products" })}
      <AdminMenu />
      <Toolbar />

      {image && (
        <div className="text-center">
          <img
            src={image}
            alt="productImage"
            className="block mx-auto max-h-[200px] rounded-md mb-5"
          />
        </div>
      )}

      <label className={CustomCSS.bigImageLabel}>
        {image ? image.name : "Upload Image"}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileUpload}
          // className="hidden"
        />
      </label>

      <div className={`${CustomCSS.gridTwo} mt-3`}>
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
            value={countInStock}
            placeholder="Enter Stock Count"
            onChange={(e) => setCountInStock(e.target.value)}
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
        <button onClick={handleUpdate} className={CustomCSS.buttonSubmit}>
          Update
        </button>
        <button onClick={handleDelete} className={CustomCSS.buttonDelete}>
          Delete
        </button>
      </div>
    </Container>
  );
};

export default UpdateProduct;
